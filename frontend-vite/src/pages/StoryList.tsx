import useSWR from "swr";
import { Link, useSearchParams } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE;

const fetcher = (url: string) => fetch(API_BASE + url).then(r => r.json());

export default function StoryList() {
  const [params, setParams] = useSearchParams();
  const selected = params.get("category") || "";

  const storiesURL = selected
    ? `/api/stories?category=${encodeURIComponent(selected)}`
    : "/api/stories";

  const { data: stories } = useSWR(storiesURL, fetcher);
  const { data: categories } = useSWR("/api/categories", fetcher);

  if (!stories || !categories) return <div>Loading…</div>;

  return (
    <div>
      <div style={{ marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button onClick={() => setParams({})}>All</button>

        {categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => setParams({ category: cat.name })}
            style={{
              background: selected === cat.name ? "#dedfff" : "#eee",
              padding: "4px 10px"
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {stories.map((story: any) => (
          <Link key={story.id} to={`/story/${story.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
              <h3>{story.title}</h3>

              <div style={{ fontSize: 12, marginBottom: 6 }}>
                {story.categories?.map((c: string) => (
                  <span
                    key={c}
                    style={{
                      padding: "2px 6px",
                      background: "#eee",
                      marginRight: 6,
                      borderRadius: 4
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>

              <p>{story.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


