/*
  # Create tables for Twitter engagement tracking

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `wallet_address` (text, unique)
      - `twitter_id` (text, unique)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `engagement_points`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `tweet_id` (text)
      - `points` (integer)
      - `engagement_type` (text)
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text UNIQUE NOT NULL,
  twitter_id text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create engagement_points table
CREATE TABLE IF NOT EXISTS engagement_points (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  tweet_id text NOT NULL,
  points integer NOT NULL DEFAULT 0,
  engagement_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE engagement_points ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can read own engagement points"
  ON engagement_points
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own engagement points"
  ON engagement_points
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());


create or replace function get_leaderboard()
returns table (
  id uuid,
  username text,
  total_points bigint
) language sql as $$
  select
    u.id,
    u.twitter_id as username,
    sum(ep.points) as total_points
  from users u
  join engagement_points ep on u.id = ep.user_id
  group by u.id, u.twitter_id
  order by total_points desc;
$$;
