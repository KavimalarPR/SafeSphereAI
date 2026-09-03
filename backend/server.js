import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// SafeSphere AI instructions
const SAFESPHERE_INSTRUCTIONS = `
You are SafeSphere AI, an intelligent personal safety assistant.

SafeSphere is a women's safety and emergency response platform with:
- Emergency SOS
- Emergency Contacts
- Live Location
- Nearby Police
- Nearby Hospitals
- SOS History
- Profile management

Your responsibilities:
1. Prioritize the user's immediate physical safety.
2. Give calm, practical and concise safety guidance.
3. If the user appears to be in immediate danger, recommend contacting local emergency services and moving to a safe or public location.
4. Never encourage confrontation with a dangerous person.
5. Never claim that you contacted police, hospitals, emergency contacts, or emergency services.
6. Never claim that an SOS was activated unless the application explicitly tells you it was activated.
7. Never invent the user's location.
8. For medical emergencies, recommend professional medical or emergency assistance.
9. When appropriate, explain which SafeSphere feature the user can use.
10. You are an AI safety assistant, not a replacement for emergency responders.

Keep responses calm, helpful, practical, and concise.
`;

// Backend health check
app.get("/", (req, res) => {
  res.json({
    message: "SafeSphere AI backend is running",
    status: "online",
  });
});

// AI Chat API
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Validate message
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "A valid message is required.",
      });
    }

    // Prevent very large messages
    if (message.length > 2000) {
      return res.status(400).json({
        error: "Message is too long. Please keep it under 2000 characters.",
      });
    }

    console.log("Received AI request:", message);

    // Send request to Gemini
    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: message,
      system_instruction: SAFESPHERE_INSTRUCTIONS,
    });

    const reply = interaction.output_text;

    // Check for empty response
    if (!reply) {
      console.error("Gemini returned an empty response.");

      return res.status(500).json({
        error: "SafeSphere AI returned an empty response.",
      });
    }

    console.log("Gemini response received successfully.");

    // Send AI response
    return res.status(200).json({
      reply,
    });
  } catch (error) {
    console.error("=================================");
    console.error("GEMINI API ERROR");
    console.error("Status:", error?.status);
    console.error("Message:", error?.message);
    console.error("=================================");

    const errorMessage = error?.message || "";

    // Gemini quota / rate limit
    if (
      error?.status === 429 ||
      errorMessage.includes("429") ||
      errorMessage.toLowerCase().includes("quota") ||
      errorMessage.toLowerCase().includes("rate limit") ||
      errorMessage.toLowerCase().includes("resource exhausted")
    ) {
      return res.status(429).json({
        error:
          "SafeSphere AI has temporarily reached its Gemini API usage limit. Please try again later.",
      });
    }

    // Invalid API key / authentication
    if (
      error?.status === 401 ||
      error?.status === 403 ||
      errorMessage.toLowerCase().includes("api key") ||
      errorMessage.toLowerCase().includes("authentication")
    ) {
      return res.status(500).json({
        error:
          "SafeSphere AI authentication failed. Please check the Gemini API configuration.",
      });
    }

    // Other Gemini/server error
    return res.status(500).json({
      error:
        "SafeSphere AI is temporarily unavailable. Please try again later.",
    });
  }
});

// Unknown route
app.use((req, res) => {
  res.status(404).json({
    error: "API endpoint not found.",
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `SafeSphere AI backend running on port ${PORT}`
  );
});