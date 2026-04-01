"use client";

import PostCard from "./PostCard";

interface Post {
  id: string;
  name: string;
  message: string;
  image_url: string | null;
  created_at: string;
}

export default function PostGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="text-6xl mb-4">🌟</div>
        <h3 className="font-display text-xl font-bold text-warm-700 dark:text-warm-300 mb-2">
          No memories yet
        </h3>
        <p className="text-warm-500 dark:text-warm-400 text-sm">
          Be the first to share a memory with Liam!
        </p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5">
        {posts.map((post, i) => (
          <PostCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
