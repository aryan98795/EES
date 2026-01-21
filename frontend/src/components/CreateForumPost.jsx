import { useState } from "react";
import api from "../api/axios.js";

export default function CreateForumPost({ onCreated }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) return setError("Title required");
    if (!file) return setError("PDF required");
    if (file.type !== "application/pdf") return setError("Only PDF allowed");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      const uploadRes = await api.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await api.post("/api/forum/posts", {
        title,
        fileUrl: uploadRes.data.fileUrl || uploadRes.data.url,
      });

      setTitle("");
      setFile(null);
      onCreated();
    } catch {
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3 rounded-lg border p-4">
      <input
        disabled={loading}
        className="w-full rounded border px-3 py-2 text-sm disabled:bg-gray-100"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        disabled={loading}
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="text-sm disabled:opacity-60"
      />

      {error && <p className="text-xs text-red-600">{error}</p>}

      <button
        disabled={loading}
        className="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Create Post"}
      </button>
    </form>
  );
}
