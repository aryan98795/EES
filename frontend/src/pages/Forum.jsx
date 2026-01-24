import { useEffect, useState } from "react";
import ForumPostCard from "../components/ForumPostCard";
import { useAuth } from "../context/AuthContext";
import CreateForumPost from "../components/CreateForumPost";
import api from "../api/axios.js";
import { useTheme } from "../context/ThemeContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Forum() {
  const { role, isLoggedIn } = useAuth() || {};
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await api.get("/api/forum/posts");
    setPosts(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    (() => fetchPosts())();
  }, []);

  if (!isLoggedIn) {
    return (
      <div
        className={`flex min-h-screen items-center justify-center ${
          darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="text-center space-y-3">
          <p className="text-sm opacity-80">
            Please login to view problem statements
          </p>
          <button
            onClick={() => navigate("/login")}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen p-5 ${
        darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {role === "coordinator" && <CreateForumPost onCreated={fetchPosts} />}

      {posts.length === 0 ? (
        <p className="mt-4 text-sm opacity-70">No posts yet</p>
      ) : (
        <div className="mt-4 space-y-3">
          {posts.map((post) => (
            <ForumPostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
