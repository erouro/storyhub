export default function Nav() {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-4 shadow">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
        <div className="text-xl font-bold">YourBrand</div>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/categories" className="hover:underline">Categories</a>
          <a href="/submit" className="hover:underline">Submit</a>
          <a href="/jobs" className="hover:underline">Jobs</a>
          <a href="/admin" className="hover:underline">Admin</a>
        </nav>
      </div>
    </header>
  );
}
