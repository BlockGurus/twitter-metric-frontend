export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          wallet_address: string
          twitter_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          wallet_address: string
          twitter_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_address?: string
          twitter_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      engagement_points: {
        Row: {
          id: string
          user_id: string
          tweet_id: string
          points: number
          engagement_type: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tweet_id: string
          points: number
          engagement_type: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tweet_id?: string
          points?: number
          engagement_type?: string
          created_at?: string
        }
      }
    }
  }
}