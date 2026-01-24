import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export default function CreateEvent() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const isEditMode = Boolean(eventId);

  const baseInput =
    "w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring transition";
  const light = "bg-white text-slate-900 border-slate-300";
  const dark = "bg-[#0f172a] text-white border-slate-600";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resources, setResources] = useState([
    { week: "Week 1", links: [{ title: "", url: "" }] },
  ]);
  const [coordinators, setCoordinators] = useState([
    { name: "", phone: "" },
  ]);
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD EVENT (EDIT) ---------------- */
  useEffect(() => {
    if (!isEditMode) return;

    (async () => {
      try {
        const { data } = await api.get(`/api/events/${eventId}`);
        setTitle(data.title || "");
        setDescription(data.description || "");
        setResources(data.resources?.length ? data.resources : resources);
        setCoordinators(
          data.coordinators?.length ? data.coordinators : coordinators
        );
      } catch {
        alert("Failed to load event");
      }
    })();
    // eslint-disable-next-line
  }, [eventId]);

  /* ---------------- RESOURCE HELPERS ---------------- */
  const addWeek = () =>
    setResources([
      ...resources,
      { week: `Week ${resources.length + 1}`, links: [{ title: "", url: "" }] },
    ]);

  const addLink = (wi) => {
    const updated = [...resources];
    updated[wi].links.push({ title: "", url: "" });
    setResources(updated);
  };

  const updateLink = (wi, li, field, value) => {
    const updated = [...resources];
    updated[wi].links[li][field] = value;
    setResources(updated);
  };

  /* ---------------- COORDINATORS ---------------- */
  const addCoordinator = () =>
    setCoordinators([...coordinators, { name: "", phone: "" }]);

  const updateCoordinator = (i, field, value) => {
    const updated = [...coordinators];
    updated[i][field] = value;
    setCoordinators(updated);
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { title, description, resources, coordinators };

    try {
      isEditMode
        ? await api.put(`/api/events/${eventId}`, payload)
        : await api.post("/api/events", payload);

      navigate("/");
    } catch {
      alert("Failed to save event");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    if (!window.confirm("Delete this event permanently?")) return;
    try {
      await api.delete(`/api/events/${eventId}`);
      navigate("/");
    } catch {
      alert("Failed to delete event");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div
      className={`min-h-[calc(100vh-80px)] px-6 py-10 ${
        darkMode ? "bg-[#0f172a]" : "bg-[#f1f9ff]"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`max-w-3xl mx-auto p-8 rounded-2xl shadow-xl ${
          darkMode ? "bg-[#1e293b] text-white" : "bg-white text-slate-900"
        }`}
      >
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Event" : "Create New Event"}
        </h1>

        {/* TITLE */}
        <input
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={`${baseInput} ${darkMode ? dark : light} mb-4`}
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={`${baseInput} ${darkMode ? dark : light} mb-8`}
        />

        {/* RESOURCES */}
        <h2 className="font-semibold mb-3">Resources</h2>
        {resources.map((week, wi) => (
          <div key={wi} className="mb-4 p-4 rounded-xl border">
            <div className="font-medium mb-3">{week.week}</div>

            {week.links.map((link, li) => (
              <div key={li} className="flex gap-2 mb-2">
                <input
                  placeholder="Title"
                  value={link.title}
                  onChange={(e) =>
                    updateLink(wi, li, "title", e.target.value)
                  }
                  className={`${baseInput} ${darkMode ? dark : light}`}
                />
                <input
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    updateLink(wi, li, "url", e.target.value)
                  }
                  className={`${baseInput} ${darkMode ? dark : light}`}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() => addLink(wi)}
              className="text-sm text-blue-500 mt-2"
            >
              + Add link
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addWeek}
          className="text-sm text-blue-500 mb-8"
        >
          + Add week
        </button>

        {/* COORDINATORS */}
        <h2 className="font-semibold mb-3">Coordinators</h2>
        {coordinators.map((c, i) => (
          <div key={i} className="flex gap-2 mb-3">
            <input
              placeholder="Name"
              value={c.name}
              onChange={(e) =>
                updateCoordinator(i, "name", e.target.value)
              }
              className={`${baseInput} ${darkMode ? dark : light}`}
            />
            <input
              placeholder="Phone"
              value={c.phone}
              onChange={(e) =>
                updateCoordinator(i, "phone", e.target.value)
              }
              className={`${baseInput} ${darkMode ? dark : light}`}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addCoordinator}
          className="text-sm text-blue-500 mb-8"
        >
          + Add coordinator
        </button>

        {/* ACTIONS */}
        <div className="flex gap-4">
          <button
            disabled={loading}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading
              ? "Saving..."
              : isEditMode
              ? "Update Event"
              : "Create Event"}
          </button>

          {isEditMode && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
