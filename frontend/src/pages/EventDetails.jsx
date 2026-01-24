import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useTheme } from "../context/ThemeContext";

export default function EventDetails() {
  const { eventId } = useParams();
  const { darkMode } = useTheme();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/events/${eventId}/details`)
      .then(res => {
        setEvent(res.data);
        setError(null);
      })
      .catch(err => {
        if (err.response?.status === 404) {
          setError("not_found");
        } else {
          setError("network");
        }
      })
      .finally(() => setLoading(false));
  }, [eventId]);
  if (loading) return <div className="p-10 text-center text-slate-500">Loading...</div>;

  if (error === "network")
    return <div className="p-10 text-center text-slate-500">Something went wrong. Try again.</div>;

  if (error === "not_found")
    return <div className="p-10 text-center text-slate-500">Event not found</div>;


  if (!event) {
    return (
      <div className="p-10 text-center text-slate-500">
        Event not found
      </div>
    );
  }

  return (
    <div
      className={`min-h-[calc(100vh-80px)] px-6 py-10 ${darkMode ? "bg-[#0f172a] text-white" : "bg-[#f1f9ff] text-slate-900"
        }`}
    >
      <div
        className={`max-w-4xl mx-auto rounded-2xl p-8 shadow-xl ${darkMode ? "bg-[#1e293b]" : "bg-white"
          }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="mt-4 text-slate-400">
              {event.description}
            </p>
          </div>

          {(role === "admin" || role === "coordinator") && (
            <Link to={`/dashboard/edit-event/${event._id}`} className="text-sm text-blue-500 hover:underline">
              Edit
            </Link>


          )}
        </div>

        {/* RESOURCES */}
        <h2 className="mt-10 mb-4 text-xl font-semibold">
          Resources
        </h2>

        <div className="grid gap-4">
          {event.resources?.map((week, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl border ${darkMode
                ? "border-slate-700 bg-[#0f172a]"
                : "border-slate-200 bg-slate-50"
                }`}
            >
              <h3 className="font-semibold mb-2">{week.week}</h3>

              <ul className="space-y-1">
                {week.links.map((l, j) => (
                  <li key={j}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {l.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER (COORDINATORS) */}
      <div
        className={`mt-12 py-4 text-sm text-center ${darkMode ? "text-slate-400" : "text-slate-600"
          }`}
      >
        <div className="font-semibold mb-1">Coordinators</div>
        {event.coordinators?.map((c, i) => (
          <div key={i}>
            {c.name} · {c.phone}
          </div>
        ))}
      </div>
    </div>
  );
}
