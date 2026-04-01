"use client";

import Particles from "./Particles";

export default function Hero({ postCount }: { postCount: number }) {
  return (
    <section className="relative overflow-hidden py-20 px-6 sm:py-28 md:py-36">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-[#1a1008] dark:via-[#1a0e08] dark:to-[#1a0810]" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <Particles />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium tracking-wide backdrop-blur-sm border border-amber-200/50 dark:border-amber-700/30">
          Farewell & Best Wishes
        </div>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-warm-900 dark:text-warm-50 mb-6 leading-[0.95]">
          So long,{" "}
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Liam
            </span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 8C30 3 60 2 100 5C140 8 170 4 198 6"
                stroke="url(#underline-gradient)"
                strokeWidth="3"
                strokeLinecap="round"
                className="animate-draw"
              />
              <defs>
                <linearGradient
                  id="underline-gradient"
                  x1="0"
                  y1="0"
                  x2="200"
                  y2="0"
                >
                  <stop stopColor="#D97706" />
                  <stop offset="0.5" stopColor="#F97316" />
                  <stop offset="1" stopColor="#E11D48" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-warm-600 dark:text-warm-300 max-w-xl mx-auto leading-relaxed font-body">
          A collection of memories, laughs, and best wishes from the team.
          <br className="hidden sm:block" />
          <span className="text-warm-500 dark:text-warm-400">
            Because some people leave a mark that stays.
          </span>
        </p>

        {postCount > 0 && (
          <div className="mt-8 inline-flex items-center gap-2 text-warm-500 dark:text-warm-400 text-sm">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-bold">
              {postCount}
            </span>
            {postCount === 1 ? "memory shared" : "memories shared"} so far
          </div>
        )}
      </div>
    </section>
  );
}
