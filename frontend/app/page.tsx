import StoryCard from "../components/StoryCard";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Home() {
  const { data, error } = useSWR("/api/stories", fetcher);

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
