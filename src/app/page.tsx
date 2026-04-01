"use client";

import { useState, useEffect, useCallback } from "react";
import Hero from "@/components/Hero";
import PostForm from "@/components/PostForm";
import PostGrid from "@/components/PostGrid";

interface Post {
  id: string;
  name: string;
  message: string;
  image_url: string | null;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <main className="min-h-screen bg-warm-50 dark:bg-warm-950">
      <Hero postCount={posts.length} />
      <PostForm onPostCreated={fetchPosts} />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-3 border-amber-300 border-t-amber-600 rounded-full animate-spin" />
        </div>
      ) : (
        <PostGrid posts={posts} />
      )}

      {/* Footer */}
      <footer className="text-center py-10 text-warm-400 dark:text-warm-600 text-xs">
        Made with love for Liam
      </footer>
    </main>
  );
}
