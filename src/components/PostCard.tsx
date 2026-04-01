"use client";

import { useEffect, useRef } from "react";

interface Post {
  id: string;
  name: string;
  message: string;
  image_url: string | null;
  created_at: string;
}

const ROTATIONS = [-2.5, 1.8, -1.2, 2.1, -0.8, 1.5, -1.8, 0.9, -2.2, 1.3];
const TAPE_COLORS = [
  "bg-amber-200/80",
  "bg-rose-200/80",
  "bg-orange-200/80",
  "bg-yellow-200/80",
  "bg-pink-200/80",
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "Z");
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function PostCard({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotation = ROTATIONS[index % ROTATIONS.length];
  const tapeColor = TAPE_COLORS[index % TAPE_COLORS.length];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.opacity = "0";
    card.style.transform = `rotate(${rotation}deg) translateY(20px) scale(0.95)`;
    requestAnimationFrame(() => {
      card.style.transition = "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
      card.style.opacity = "1";
      card.style.transform = `rotate(${rotation}deg) translateY(0) scale(1)`;
    });
  }, [rotation]);

  return (
    <div
      ref={cardRef}
      className="group break-inside-avoid mb-5"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative bg-white dark:bg-warm-800 rounded-lg shadow-md shadow-warm-900/8 dark:shadow-black/20 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-warm-900/12 dark:hover:shadow-black/30 hover:-translate-y-1 hover:rotate-0 border border-warm-100 dark:border-warm-700/50">
        {/* Tape decoration */}
        <div
          className={`absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-5 ${tapeColor} dark:opacity-60 rounded-sm z-10`}
          style={{ transform: `translateX(-50%) rotate(${-rotation * 0.5}deg)` }}
        />

        {/* Image */}
        {post.image_url && (
          <div className="relative pt-3 px-3">
            <img
              src={post.image_url}
              alt={`Memory from ${post.name}`}
              className="w-full rounded-md object-cover max-h-72"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-4 pt-3">
          <p className="text-warm-800 dark:text-warm-100 text-sm leading-relaxed whitespace-pre-wrap font-body">
            {post.message}
          </p>

          <div className="mt-3 pt-3 border-t border-warm-100 dark:border-warm-700/50 flex items-center justify-between">
            <span className="text-sm font-semibold text-warm-700 dark:text-warm-300 font-display">
              — {post.name}
            </span>
            <span className="text-xs text-warm-400 dark:text-warm-500">
              {formatDate(post.created_at)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
