import useSWR from "swr";
import { useParams, Link } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://storyhub-1-8zac.onrender.com";

const fetcher = (url: string) =>
  fetch(API_BASE + url).then((res) => res.json());

export default function CategoryPage() {
  const { name } = useParams<{ name: string }>();
  const { data: stories, error } = useSWR(`/api/stories?category=${encodeURIComponent(name || '')}`, fetcher);

  if (error) return <div>Failed to load category.</div>;
  if (!stories) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Link to="/">← Back</Link>
      </div>
      <h2>{name}</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        {stories.map((s: any) => (
          <article key={s.id} style={{ padding: 12, border: '1px solid #eee' }}>
            <Link to={`/story/${s.id}`}>{s.title}</Link>
            <p>{s.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
