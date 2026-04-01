"use client";

import { useState, useRef } from "react";

interface PostFormProps {
  onPostCreated: () => void;
}

export default function PostForm({ onPostCreated }: PostFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File | null) {
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) handleFile(f);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);

    let image_url: string | null = null;

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      image_url = uploadData.url;
    }

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), message: message.trim(), image_url }),
    });

    setName("");
    setMessage("");
    setFile(null);
    setPreview(null);
    setSubmitting(false);
    onPostCreated();
  }

  return (
    <section className="max-w-2xl mx-auto px-6 -mt-8 relative z-20">
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 dark:bg-warm-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-amber-900/5 dark:shadow-black/20 border border-amber-100/50 dark:border-warm-700/50 p-6 sm:p-8"
      >
        <h2 className="font-display text-2xl font-bold text-warm-800 dark:text-warm-100 mb-1">
          Leave a memory
        </h2>
        <p className="text-warm-500 dark:text-warm-400 text-sm mb-6">
          Share a photo, a story, or just say goodbye
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1.5">
              Your name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jane from Engineering"
              required
              className="w-full px-4 py-2.5 rounded-xl bg-warm-50 dark:bg-warm-900/50 border border-warm-200 dark:border-warm-700 text-warm-900 dark:text-warm-100 placeholder:text-warm-400 dark:placeholder:text-warm-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1.5">
              Your message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your favorite memory, a funny story, or a heartfelt goodbye..."
              required
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl bg-warm-50 dark:bg-warm-900/50 border border-warm-200 dark:border-warm-700 text-warm-900 dark:text-warm-100 placeholder:text-warm-400 dark:placeholder:text-warm-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-sm resize-none"
            />
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-sm font-medium text-warm-700 dark:text-warm-300 mb-1.5">
              Photo or screenshot{" "}
              <span className="text-warm-400 font-normal">(optional)</span>
            </label>

            {preview ? (
              <div className="relative group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-xl border border-warm-200 dark:border-warm-700"
                />
                <button
                  type="button"
                  onClick={() => handleFile(null)}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  dragActive
                    ? "border-amber-400 bg-amber-50/50 dark:bg-amber-900/20"
                    : "border-warm-200 dark:border-warm-700 hover:border-amber-300 hover:bg-amber-50/30 dark:hover:bg-amber-900/10"
                }`}
              >
                <div className="text-3xl mb-2">📸</div>
                <p className="text-sm text-warm-500 dark:text-warm-400">
                  Drag & drop an image, or{" "}
                  <span className="text-amber-600 dark:text-amber-400 font-medium">
                    click to browse
                  </span>
                </p>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting || !name.trim() || !message.trim()}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 active:scale-[0.98]"
        >
          {submitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Posting...
            </span>
          ) : (
            "Post your memory ✨"
          )}
        </button>
      </form>
    </section>
  );
}
