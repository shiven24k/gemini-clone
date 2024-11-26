import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;

async function getModelWithRetry(genAI, retries = 5, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const model = await genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });
      return model;
    } catch (error) {
      if (error.message.includes("too many requests")) {
        if (i < retries - 1) {
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Exponential backoff
        } else {
          throw new Error("Max retries reached. Too many requests.");
        }
      } else {
        throw error;
      }
    }
  }
}

async function runChat(prompt) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = await getModelWithRetry(genAI);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text());
  return response.text();
}

export default runChat;