export default function StoryCard({ story }: any) {
  return (
    <article className="bg-slate-900 p-4 rounded-lg shadow">
      <div className="flex gap-4">
        <img
          src={story.thumbnail_url || "/placeholder.png"}
          alt="thumb"
          className="w-28 h-20 object-cover rounded"
        />
        <div>
          <div className="text-sm text-slate-400">
            {story.primary_tag || (story.categories && story.categories[0])}
          </div>
          <h3 className="text-lg font-semibold">{story.title}</h3>
          <p className="text-slate-400 text-sm">{story.excerpt}</p>
        </div>
      </div>
    </article>
  );
}
