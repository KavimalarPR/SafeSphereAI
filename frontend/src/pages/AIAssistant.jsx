import Navbar from "../components/Navbar";
import { useState } from "react";
import "./AIAssistant.css";

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I'm SafeSphere AI. I can help you with personal safety guidance, emergency situations, and SafeSphere features. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (messageText = input) => {
    const message = messageText.trim();

    if (!message || loading) {
      return;
    }

    // Add user's message to chat
    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: message,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/ai/chat",
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            data.reply ||
            "I'm sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error("AI Assistant error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: "I'm unable to connect to SafeSphere AI right now. Please make sure the SafeSphere backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const handleSuggestion = (suggestion) => {
    sendMessage(suggestion);
  };

  return (
    <>
      <Navbar />

      <main className="ai-page">
        <div className="ai-container">

          {/* Header */}
          <header className="ai-header">
            <div className="ai-header-icon">
              ✦
            </div>

            <div>
              <div className="ai-label">
                SAFETY INTELLIGENCE
              </div>

              <h1>SafeSphere AI</h1>

              <p>
                Your intelligent personal safety assistant
              </p>
            </div>

            <div className="ai-online">
              <span></span>
              AI ONLINE
            </div>
          </header>

          {/* Chat area */}
          <section className="ai-chat-card">

            <div className="ai-chat-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`ai-message ${
                    message.role === "user"
                      ? "user-message"
                      : "assistant-message"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="message-avatar">
                      ✦
                    </div>
                  )}

                  <div className="message-content">
                    <div className="message-name">
                      {message.role === "user"
                        ? "YOU"
                        : "SAFESPHERE AI"}
                    </div>

                    <div className="message-text">
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <div className="ai-message assistant-message">
                  <div className="message-avatar">
                    ✦
                  </div>

                  <div className="message-content">
                    <div className="message-name">
                      SAFESPHERE AI
                    </div>

                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && !loading && (
              <div className="ai-suggestions">
                <button
                  onClick={() =>
                    handleSuggestion(
                      "I am walking alone at night. What safety precautions should I take?"
                    )
                  }
                >
                  🌙 Walking alone at night
                </button>

                <button
                  onClick={() =>
                    handleSuggestion(
                      "I feel unsafe right now. What should I do?"
                    )
                  }
                >
                  🛡️ I feel unsafe
                </button>

                <button
                  onClick={() =>
                    handleSuggestion(
                      "What should I do during an emergency?"
                    )
                  }
                >
                  🚨 Emergency guidance
                </button>

                <button
                  onClick={() =>
                    handleSuggestion(
                      "How can SafeSphere help keep me safe?"
                    )
                  }
                >
                  ✦ SafeSphere features
                </button>
              </div>
            )}

            {/* Input */}
            <form
              className="ai-input-area"
              onSubmit={handleSubmit}
            >
              <textarea
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                placeholder="Ask SafeSphere AI about your safety..."
                rows="1"
                disabled={loading}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    handleSubmit(event);
                  }
                }}
              />

              <button
                type="submit"
                className="ai-send-button"
                disabled={!input.trim() || loading}
              >
                {loading ? "..." : "➤"}
              </button>
            </form>

            <div className="ai-disclaimer">
              <span>⚠</span>
              SafeSphere AI provides safety guidance but is
              not a replacement for emergency services.
            </div>
          </section>

        </div>
      </main>
    </>
  );
}

export default AIAssistant;