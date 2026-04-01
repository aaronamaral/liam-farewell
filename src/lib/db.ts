import { sql } from "@vercel/postgres";

export interface Post {
  id: string;
  name: string;
  message: string;
  image_url: string | null;
  created_at: string;
}

export async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      image_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;
}

export async function getAllPosts(): Promise<Post[]> {
  await ensureTable();
  const { rows } = await sql`
    SELECT id, name, message, image_url, created_at
    FROM posts
    ORDER BY created_at DESC
  `;
  return rows as Post[];
}

export async function createPost(post: {
  id: string;
  name: string;
  message: string;
  image_url: string | null;
}): Promise<Post> {
  await ensureTable();
  const { rows } = await sql`
    INSERT INTO posts (id, name, message, image_url)
    VALUES (${post.id}, ${post.name}, ${post.message}, ${post.image_url})
    RETURNING id, name, message, image_url, created_at
  `;
  return rows[0] as Post;
}
