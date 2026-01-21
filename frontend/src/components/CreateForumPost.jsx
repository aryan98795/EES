import { useState } from "react";
import axios from "axios";

export default function CreateForumPost({ onCreated }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    if (!file || !title) return;

    setLoading(true);

    const fd = new FormData();
    fd.append("file", file);

    const uploadRes = await axios.post("/api/upload", fd);
    const fileUrl = uploadRes.res.data.url;
    await axios.post("/api/forum/posts", {
      title: title,
      fileUrl: fileUrl,
    });

    setTitle("");
    setFile(null);
    setLoading(false);
    onCreated();
  };

  return (
    <form onSubmit={submit} className="create-post">
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle.e.target.value}
      />
      <input
        type="file"
        accept="application/pdf"
        value={title}
        onChange={(e) => setTitle.e.target.files[0]}
      />
      <button disabled={loading}>
        {loading ? "Uploading..." : "Create Post"}
      </button>
    </form>
  );
}
