'use client'

export const dynamic = "force-dynamic";

import useSWR from "swr";
import StoryCard from "../components/StoryCard";

const API_BASE = process.env.NEXT_PUBLIC_API_ORIGIN || "https://storyhub-1-8zac.onrender.com";

const fetcher = (url: string) => fetch(API_BASE + url).then(r => r.json());

export default function Home() {
  const { data, error } = useSWR("/api/stories", fetcher);

  if (error) return <div>Failed to load stories.</div>;
  if (!data) return <div>Loading stories...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">New Arrivals</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {data.map((s: any) => (
          <StoryCard key={s.id} story={s} />
        ))}
      </div>
    </div>
  );
}



