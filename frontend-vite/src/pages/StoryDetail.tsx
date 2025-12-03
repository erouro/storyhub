import { useParams, Link, useNavigate } from "react-router-dom";
import useSWR from "swr";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://storyhub-1-8zac.onrender.com";

const fetcher = (url: string) =>
  fetch(API_BASE + url).then((res) => res.json());

export default function StoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // fetch all stories then find the one with id (backend currently provides only /api/stories)
  const { data, error } = useSWR("/api/stories", fetcher);

  if (error) return <div>Failed to load story.</div>;
  if (!data) return <div>Loading story...</div>;

  const story = data.find((s: any) => String(s.id) === String(id));
  if (!story) return <div>Story not found. <button onClick={() => navigate(-1)}>Go back</button></div>;

  return (
    <article style={{ padding: 12 }}>
      <div style={{ marginBottom: 12 }}>
        <Link to="/" style={{ color: "#1a73e8" }}>← Back to list</Link>
      </div>

      <h2 style={{ marginTop: 0 }}>{story.title}</h2>
      <div style={{ color: "#666", marginBottom: 12 }}>
        {story.primary_tag || (story.categories && story.categories.join(", "))}
      </div>

      {story.thumbnail_url && (
        <img src={story.thumbnail_url} alt="thumb" style={{ width: "100%", maxHeight: 360, objectFit: "cover", borderRadius: 8, marginBottom: 12 }} />
      )}

      <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6, color: "#222" }}>
        {story.content}
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={() => navigate(-1)} style={{ padding: "8px 12px", borderRadius: 6 }}>Back</button>
      </div>
    </article>
  );
}
