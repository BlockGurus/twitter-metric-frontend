import "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    accessSecret?: string;
    twitterId?: string;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    accessSecret?: string;
    twitterId?: string;
    username?: string;
  }
}