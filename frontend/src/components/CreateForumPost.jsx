import { useState } from "react";
import api from "../api/axios.js";
import { useTheme } from "../context/ThemeContext.jsx";

export default function CreateForumPost({ onCreated }) {
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const { darkMode } = useTheme();
  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!file) return setError("PDF required");
    if (!title.trim()) return setError("Title required");
    if (!formUrl.trim()) return setError("Google Form link required");
    if (file.type !== "application/pdf") return setError("Only PDF allowed");

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", title);
      formData.append("formUrl", formUrl);
      const uploadRes = await api.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await api.post("/api/forum/posts", {
        title,
        fileUrl: uploadRes.data.fileUrl || uploadRes.data.url,
        formUrl,
      });
      setSuccess("Problem Statement uploaded successfully");

      setTitle("");
      setFile(null);
      setFormUrl("");
      onCreated();
    } catch {
      setError("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className={`space-y-3 rounded-lg border p-4 ${
        darkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
      }`}
    >
      <input
        disabled={loading}
        className={`w-full rounded border px-3 py-2 text-sm disabled:opacity-60 ${
          darkMode
            ? "border-gray-700 bg-gray-800 text-white placeholder-gray-400"
            : "border-gray-300 bg-white text-black placeholder-gray-500"
        }`}
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="url"
        disabled={loading}
        className={`w-full rounded border px-3 py-2 text-sm disabled:opacity-60 ${
          darkMode
            ? "border-gray-700 bg-gray-800 text-white placeholder-gray-400"
            : "border-gray-300 bg-white text-black placeholder-gray-500"
        }`}
        placeholder="Google Form link"
        value={formUrl}
        onChange={(e) => setFormUrl(e.target.value)}
        required
      />

      <input
        disabled={loading}
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className={`text-sm disabled:opacity-60 ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
      />
      {success && (
        <p className="text-center text-xs font-medium text-green-500">
          {success}
        </p>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        disabled={loading}
        className={`rounded px-4 py-2 text-sm font-medium disabled:opacity-50 ${
          darkMode
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {loading ? "Uploading..." : "Create Post"}
      </button>
    </form>
  );
}
