import useSWR from "swr";
import { useParams, Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

const fetcher = (url: string) => fetch(API_BASE + url).then(r => r.json());

export default function CategoryPage() {
  const { name } = useParams();
  const { data: stories } = useSWR(`/api/stories?category=${name}`, fetcher);

  if (!stories) return <div>Loading…</div>;

  return (
    <div>
      <Link to="/">← Back</Link>
      <h2>{name}</h2>

      {stories.map((s: any) => (
        <Link to={`/story/${s.id}`} key={s.id} style={{ textDecoration: "none", color: "inherit" }}>
          <div style={{ padding: 12, border: "1px solid #ddd", marginTop: 12 }}>
            <h3>{s.title}</h3>
            <p>{s.excerpt}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
