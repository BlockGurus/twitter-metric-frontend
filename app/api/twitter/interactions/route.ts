import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const POINT_VALUES = {
  like: 2,
  comment: 3,
  retweet: 4,
  quote: 5,
};

async function fetchTwitterInteractions(accessToken: string, twitterId: string) {
  const coinfiId = "coinfi"; // Replace with actual coinfi Twitter ID
  const endpoint = `https://api.twitter.com/2/users/${twitterId}/tweets`;
  
  try {
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Twitter API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching from Twitter API:", error);
    throw error;
  }
}

async function storeInteractions(userId: string, interactions: any[]) {
  try {
    // First, get existing interactions for this user
    const { data: existingInteractions } = await supabase
      .from("engagement_points")
      .select("tweet_id, engagement_type")
      .eq("user_id", userId);

    // Create a Set of existing interaction keys for efficient lookup
    const existingKeys = new Set(
      existingInteractions?.map(
        (i) => `${i.tweet_id}-${i.engagement_type}`
      )
    );

    // Filter out interactions that already exist
    const newInteractions = interactions.filter(
      (interaction) => !existingKeys.has(`${interaction.id}-${interaction.type}`)
    );

    if (newInteractions.length === 0) {
      return; // No new interactions to store
    }

    const processedInteractions = newInteractions.map(interaction => ({
      user_id: userId,
      tweet_id: interaction.id,
      engagement_type: interaction.type,
      points: POINT_VALUES[interaction.type as keyof typeof POINT_VALUES],
      created_at: new Date().toISOString()
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

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.accessToken || !session?.twitterId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch interactions from Twitter API
    const interactions = await fetchTwitterInteractions(
      session.accessToken,
      session.twitterId
    );

    // Store new interactions in Supabase
    await storeInteractions(session.twitterId, interactions);

    return NextResponse.json({
      success: true,
      message: "Interactions fetched and stored successfully"
    });
  } catch (error) {
    console.error("Error processing Twitter interactions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}