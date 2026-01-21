import { useEffect, useState } from "react";
import ForumPostCard from "../components/ForumPostCard";
import { useAuth } from "../context/AuthContext";
import CreateForumPost from "../components/CreateForumPost";
import api from "../api/axios.js";

export default function Forum() {
  const { role } = useAuth() || {};
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = api.get("/api/forum/posts");
    setPosts(Array.isArray(res.data) ? res.data : []);
  };

  useEffect(() => {
    (async () => {
      await fetchPosts();
    })();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      {role === "coordinator" && <CreateForumPost onCreated={fetchPosts} />}

      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => <ForumPostCard key={post._id} post={post} />)
      )}
    </div>
  );
}
