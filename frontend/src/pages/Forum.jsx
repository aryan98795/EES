import { useEffect, useState } from "react";
import ForumPostCard from "../components/ForumPostCard";
import { useAuth } from "../context/AuthContext";
import CreateForumPost from "../components/CreateForumPost";

import axios from "axios";

export default function Forum() {
  const [post, setPosts] = useState([]);
  const { role } = useAuth();
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/forum/posts");
      setPosts(res.data);
    })();
  }, []);
  return (
    <div className="forum">
      {role == "coordinator" && (
        <CreateForumPost
          onCreated={async () => {
            const res = await axios.get("/api/forum/posts");
            setPosts(res.data);
          }}
        />
      )}
      {post.map((post) => (
        <ForumPostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
