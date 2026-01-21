import { useEffect, useState } from "react";
import ForumPostCard from "../components/ForumPostCard";

import axios from "axios";

export default function Forum() {
  const [post, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/forum/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <div className="forum">
      {post.map((post) => (
        <ForumPostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
