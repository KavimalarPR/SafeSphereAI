import { useState } from "react";
import Navbar from "../components/Navbar";
import "./AIAssistant.css";

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I'm SafeSphere AI. I can help you with personal safety guidance, emergency situations, travel safety, and SafeSphere features. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "I feel unsafe while walking alone",
    "What should I do in an emergency?",
    "How can I stay safe while traveling?",
    "How does SafeSphere SOS work?",
  ];

  const sendMessage = async (messageText = input) => {
    const message = messageText.trim();

    if (!message || loading) {
      return;
    }

    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://safesphere-ai-backend-cao0.onrender.com/api/ai/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
          }),
        }
      );

      // Try to read backend response
      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      // Gemini quota exceeded
      if (response.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "⚠️ SafeSphere AI has temporarily reached its Gemini API usage limit. Please try again after some time.",
            error: true,
          },
        ]);

        return;
      }

      // Backend/server error
      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text:
              data.error ||
              "SafeSphere AI is temporarily unavailable. Please try again later.",
            error: true,
          },
        ]);

        return;
      }

      // No AI response
      if (!data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            text: "SafeSphere AI did not return a response. Please try again.",
            error: true,
          },
        ]);

        return;
      }

      // Successful AI response
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("AI Assistant Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ Unable to connect to SafeSphere AI. Please check your internet connection or try again later.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      <Navbar />

      <main className="ai-page">
        <div className="ai-container">

          {/* Header */}
          <section className="ai-header">
            <div>
              <span className="ai-badge">
                SAFETY INTELLIGENCE
              </span>

              <h1>SafeSphere AI</h1>

              <p>
                Your intelligent personal safety assistant for
                guidance, emergency awareness, and safer decisions.
              </p>
            </div>

            <div className="ai-status">
              <span className="status-dot"></span>
              AI Assistant
            </div>
          </section>

          {/* Chat Card */}
          <section className="ai-chat-card">

            {/* Messages */}
            <div className="chat-messages">

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message-row ${
                    message.sender === "user"
                      ? "user-message"
                      : "ai-message"
                  }`}
                >

                  {/* AI Avatar */}
                  {message.sender === "ai" && (
                    <div className="ai-avatar">
                      AI
                    </div>
                  )}

                  {/* Message */}
                  <div
                    className={`message-bubble ${
                      message.error
                        ? "error-message"
                        : ""
                    }`}
                  >
                    {message.text}
                  </div>

                </div>
              ))}

              {/* Loading */}
              {loading && (
                <div className="message-row ai-message">

                  <div className="ai-avatar">
                    AI
                  </div>

                  <div className="message-bubble typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                </div>
              )}

            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="suggestions">

                <p>Try asking:</p>

                <div className="suggestion-list">

                  {suggestions.map(
                    (suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() =>
                          sendMessage(suggestion)
                        }
                        disabled={loading}
                      >
                        {suggestion}
                      </button>
                    )
                  )}

                </div>

              </div>
            )}

            {/* Input */}
            <form
              className="ai-input-area"
              onSubmit={handleSubmit}
            >

              <textarea
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                placeholder="Ask SafeSphere AI about your safety..."
                rows="1"
                disabled={loading}
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {
                    e.preventDefault();
                    handleSubmit(e);
                  }

                }}
              />

              <button
                type="submit"
                className="send-button"
                disabled={
                  loading ||
                  !input.trim()
                }
              >
                {loading ? "..." : "Send"}
              </button>

            </form>

            {/* Disclaimer */}
            <div className="ai-disclaimer">
              SafeSphere AI provides general safety guidance
              and is not a replacement for emergency services
              or professional assistance.
            </div>

          </section>
        </div>
      </main>
    </>
  );
}

export default AIAssistant;