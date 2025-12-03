import useSWR from "swr";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://storyhub-1-8zac.onrender.com";

const fetcher = (url: string) =>
  fetch(API_BASE + url).then((res) => res.json());

export default function App() {
  const { data, error } = useSWR("/api/stories", fetcher);

  if (error) return <div>Failed to load stories.</div>;
  if (!data) return <div>Loading stories...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>New Stories</h1>
      {data.map((story: any) => (
        <div
          key={story.id}
          style={{ padding: 10, border: "1px solid #ddd", marginBottom: 10 }}
        >
          <h3>{story.title}</h3>
          <p>{story.description}</p>
        </div>
      ))}
    </div>
  );
}
