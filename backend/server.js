import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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
`;

app.get("/", (req, res) => {
  res.json({
    message: "SafeSphere AI backend is running",
  });
});

app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "A valid message is required.",
      });
    }

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: message,
      system_instruction: SAFESPHERE_INSTRUCTIONS,
    });

    res.json({
      reply: interaction.output_text,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    res.status(500).json({
      error: "Unable to get a response from SafeSphere AI.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `SafeSphere AI backend running on http://localhost:${PORT}`
  );
});