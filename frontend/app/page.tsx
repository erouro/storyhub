'use client'

import useSWR from "swr";
import StoryCard from "../components/StoryCard";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Home() {
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_API_ORIGIN + "/api/stories",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

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

