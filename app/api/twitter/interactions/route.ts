import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const POINT_VALUES = {
  like: 2,
  comment: 3,
  retweet: 4,
  quote: 5,
};

async function fetchTwitterInteractions(accessToken: string, userId: string) {
  const coinfiId = "799445244802662400";

  const likesEndpoint = `https://api.twitter.com/2/users/${userId}/liked_tweets?expansions=author_id`;
  const retweetsEndpoint = `https://api.twitter.com/2/users/${userId}/retweets`;
  const tweetsEndpoint = `https://api.twitter.com/2/users/${userId}/tweets?expansions=referenced_tweets.id&tweet.fields=referenced_tweets`;

  try {
    const [likesRes, retweetsRes, tweetsRes] = await Promise.all([
      fetch(likesEndpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      fetch(retweetsEndpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
      fetch(tweetsEndpoint, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    ]);

    if (!likesRes.ok || !retweetsRes.ok || !tweetsRes.ok) {
      throw new Error("Failed to fetch Twitter interactions");
    }

    const [likes, retweets, tweets] = await Promise.all([
      likesRes.json(),
      retweetsRes.json(),
      tweetsRes.json(),
    ]);

    const interactions = [];

    for (const like of likes.data || []) {
      if (like.author_id === coinfiId) {
        interactions.push({ id: like.id, type: "like" });
      }
    }

    for (const retweet of retweets.data || []) {
      if (retweet.author_id === coinfiId) {
        interactions.push({ id: retweet.id, type: "retweet" });
      }
    }

    for (const tweet of tweets.data || []) {
      if (tweet.referenced_tweets) {
        const reference = tweet.referenced_tweets[0];
        if (reference.author_id === coinfiId) {
          if (reference.type === "quoted") {
            interactions.push({ id: reference.id, type: "quote" });
          } else if (reference.type === "replied_to") {
            interactions.push({ id: reference.id, type: "comment" });
          }
        }
      }
    }

    return interactions;
  } catch (error) {
    console.error("Error fetching from Twitter API:", error);
    throw error;
  }
}

async function storeInteractions(userId: string, interactions: any[]) {
  try {
    const { data: existingInteractions } = await supabase
      .from("engagement_points")
      .select("tweet_id, engagement_type")
      .eq("user_id", userId);

    const existingKeys = new Set(
      existingInteractions?.map((i) => `${i.tweet_id}-${i.engagement_type}`)
    );

    const newInteractions = interactions.filter(
      (interaction) =>
        !existingKeys.has(`${interaction.id}-${interaction.type}`)
    );

    if (newInteractions.length === 0) return;

    const processedInteractions = newInteractions.map((interaction) => ({
      user_id: userId,
      tweet_id: interaction.id,
      engagement_type: interaction.type,
      points: POINT_VALUES[interaction.type as keyof typeof POINT_VALUES],
      created_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from("engagement_points")
      .insert(processedInteractions);

    if (error) throw error;
  } catch (error) {
    console.error("Error storing interactions:", error);
    throw error;
  }
}

export async function GET(req: Request) {
  try {
    const {
      data: { session },
      error: authError,
    } = await supabase.auth.getSession();

    if (authError || !session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("twitter_id, twitter_access_token")
      .eq("id", session.user.id)
      .single();

    if (userError || !userData?.twitter_id || !userData?.twitter_access_token) {
      return NextResponse.json(
        { error: "Twitter account not connected" },
        { status: 400 }
      );
    }

    const interactions = await fetchTwitterInteractions(
      userData.twitter_access_token,
      userData.twitter_id
    );

    await storeInteractions(session.user.id, interactions);

    return NextResponse.json({
      success: true,
      message: "Interactions fetched and stored successfully",
    });
  } catch (error) {
    console.error("Error processing Twitter interactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
