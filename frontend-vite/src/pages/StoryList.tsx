import useSWR from "swr";
import { Link } from "react-router-dom";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://storyhub-1-8zac.onrender.com";

const fetcher = (url: string) =>
  fetch(API_BASE + url).then((res) => res.json());

export default function StoryList() {
  const { data, error } = useSWR("/api/stories", fetcher);

  if (error) return <div>Failed to load stories.</div>;
  if (!data) return <div>Loading stories...</div>;

  return (
    <div>
      <div style={{ display: "grid", gap: 12 }}>
        {data.map((story: any) => (
          <article key={story.id} style={{ padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
            <Link to={`/story/${encodeURIComponent(story.id)}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <img
                  src={story.thumbnail_url || "/placeholder.png"}
                  alt="thumb"
                  style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }}
                />
                <div>
                  <div style={{ fontSize: 12, color: "#666" }}>{story.primary_tag || (story.categories && story.categories[0])}</div>
                  <h3 style={{ margin: "6px 0" }}>{story.title}</h3>
                  <p style={{ margin: 0, color: "#444" }}>{story.excerpt}</p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
