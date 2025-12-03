import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StoryList from "./pages/StoryList";
import StoryDetail from "./pages/StoryDetail";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20, fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <header style={{ marginBottom: 20 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1 style={{ margin: 0 }}>StoryHub</h1>
            <div style={{ color: "#666", fontSize: 14 }}>New Stories</div>
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<StoryList />} />
          <Route path="/story/:id" element={<StoryDetail />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="*" element={<div>Page not found. <Link to="/">Go home</Link></div>} />
        </Routes>

        <footer style={{ marginTop: 40, color: "#888", fontSize: 13 }}>
          © StoryHub
        </footer>
      </div>
    </BrowserRouter>
  );
}

