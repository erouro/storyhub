import useSWR from "swr";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const API_BASE =
  import.meta.env.VITE_API_BASE || "https://storyhub-1-8zac.onrender.com";

const fetcher = (url: string) =>
  fetch(API_BASE + url).then((res) => res.json());

export default function StoryList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';

  // fetch stories with optional category filter
  const storiesUrl = selectedCategory ? `/api/stories?category=${encodeURIComponent(selectedCategory)}` : '/api/stories';
  const { data: stories, error: errStories } = useSWR(storiesUrl, fetcher);

  // categories list for filter bar
  const { data: categories } = useSWR('/api/categories', fetcher);

  if (errStories) return <div>Failed to load stories.</div>;
  if (!stories) return <div>Loading stories...</div>;

  const clearFilter = () => {
    setSearchParams({});
  };

  return (
    <div>
      <div style={{ marginBottom: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={clearFilter} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid #ddd', background: !selectedCategory ? '#eee' : '#fff' }}>All</button>
        {categories && categories.map((cat: any) => (
          <button
            key={cat.id}
            onClick={() => setSearchParams({ category: cat.name })}
            style={{
              padding: '6px 10px',
              borderRadius: 6,
              border: '1px solid #ddd',
              background: (selectedCategory === cat.name) ? '#e6f0ff' : '#fff'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {stories.map((story: any) => (
          <article key={story.id} style={{ padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
            <Link to={`/story/${encodeURIComponent(story.id)}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <img
                  src={story.thumbnail_url || "/placeholder.png"}
                  alt="thumb"
                  style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 6 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "#666", marginBottom: 6 }}>
                    {story.categories && story.categories.slice(0, 3).map((c: string, i: number) => (
                      <span key={i} style={{ marginRight: 8, padding: '2px 6px', borderRadius: 6, background: '#f3f4f6', fontSize: 12 }}>{c}</span>
                    ))}
                  </div>
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

