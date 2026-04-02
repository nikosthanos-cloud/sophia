"use client";

import { use, useState } from "react";

export default function ChatSession({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [messages, setMessages] = useState<{ role: "user" | "sophia"; text: string }[]>([
    { role: "sophia", text: "Hello. I am Sophia. What would you like to explore today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/dialogue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: id, userMessage: userMsg }),
      });
      const data = await res.json();

      if (data.sophiaQuestion) {
        setMessages((prev) => [...prev, { role: "sophia", text: data.sophiaQuestion }]);
      } else {
        alert(data.error || "An error occurred");
      }
    } catch (e) {
      console.error(e);
      alert("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-12 text-gray-900">
      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        <header className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">Sophia Session</h1>
            <p className="text-sm text-gray-500">Socratic reasoning engine</p>
          </div>
          <a href="/" className="text-sm text-blue-600 hover:underline">Exit</a>
        </header>

        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${msg.role === "user" ? "bg-black text-white rounded-br-none" : "bg-gray-100 text-black rounded-bl-none"}`}>
                <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-500 p-4 rounded-2xl rounded-bl-none text-sm animate-pulse">
                Sophia is thinking...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Explain your situation..."
              className="flex-1 border border-gray-300 rounded-xl p-3 outline-none focus:border-black resize-none h-14 bg-white text-sm"
              rows={1}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-black text-white px-6 rounded-xl hover:bg-gray-800 disabled:bg-gray-400 transition font-medium text-sm"
            >
              Send
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">Press Enter to send, Shift+Enter for new line.</p>
        </div>
      </div>
    </main>
  );
}
