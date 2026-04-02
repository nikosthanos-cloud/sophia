"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SessionInit() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStart = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/session/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (data.sessionId) {
        router.push(`/session/${data.sessionId}`);
      } else {
        alert(data.error || "Failed to start session");
      }
    } catch (e) {
      console.error(e);
      alert("Error starting session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-24 bg-gray-50 text-gray-900">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">New Sophia Session</h1>
        <p className="text-gray-500 text-center text-sm">
          What is the main topic you want to explore?
        </p>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. startup idea, leadership decision"
          className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-black"
        />
        <button
          onClick={handleStart}
          disabled={loading || !topic}
          className="w-full bg-black text-white rounded-lg p-3 hover:bg-gray-800 disabled:bg-gray-400 transition"
        >
          {loading ? "Initializing..." : "Start Exploring"}
        </button>
      </div>
    </main>
  );
}
