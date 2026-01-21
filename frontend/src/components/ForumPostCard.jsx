import { useNavigate } from "react-router-dom";
export default function ForumPostCard({ post }) {
  const navigate = useNavigate();

  return (
    <div className="forum-card">
      <h3>{post.title}</h3>
      <button onClick={() => navigate(post.fileUrl)}>Download</button>
    </div>
  );
}
