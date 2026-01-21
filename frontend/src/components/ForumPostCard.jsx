import { useNavigate } from "react-router-dom";

export default function ForumPostCard({ post }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">📄</span>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">{post.title}</h3>
        </div>
      </div>

      <button
        onClick={() => navigate(post.fileUrl)}
        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Download
      </button>
    </div>
  );
}
