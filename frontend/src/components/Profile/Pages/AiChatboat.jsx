return (
  <div className="max-w-3xl mx-auto h-[70vh] flex flex-col bg-white border rounded-xl shadow">

    {/* HEADER */}
    <div className="px-6 py-4 border-b flex items-center gap-2 text-blue-700 font-semibold text-lg">
      <FaRobot /> AI Health Assistant
    </div>

    {/* CHAT BODY */}
    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
      {messages.map((m, i) => (
        <div
          key={i}
          className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[75%] px-4 py-2 rounded-xl text-sm ${
              m.sender === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {m.text}
          </div>
        </div>
      ))}
      {loading && (
        <p className="text-sm text-gray-500">AI is typing...</p>
      )}
    </div>

    {/* INPUT BAR */}
    <div className="p-4 border-t flex gap-3">
      <input
        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask a health question..."
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center justify-center"
      >
        <IoSend size={18} />
      </button>
    </div>

  </div>
);
