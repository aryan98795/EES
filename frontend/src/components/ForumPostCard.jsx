import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext.jsx";

export default function ForumPostCard({ post }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth() || {};
  const { darkMode } = useTheme();
  const submitSoln = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    window.open(post.formUrl, "_blank");
  };

  // const deletePost = () => {};

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-lg border p-4 ${
        darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">📄</span>
        <h3
          className={`text-sm font-semibold ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {post.title}
        </h3>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => navigate(post.fileUrl)}
          className={`rounded-md px-3 py-1.5 text-sm text-white ${
            darkMode
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Download
        </button>

        <button
          onClick={submitSoln}
          className={`rounded-md px-3 py-1.5 text-sm text-white ${
            isLoggedIn
              ? darkMode
                ? "bg-green-500 hover:bg-green-600"
                : "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Submit Solution
        </button>

        {/* <button
          onClick={deletePost}
          className={`rounded-md px-3 py-1.5 text-sm text-white ${
            darkMode
              ? "bg-red-500 hover:bg-red-600"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Delete
        </button> */}
      </div>
    </div>
  );
}
