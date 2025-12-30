// src/services/aiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface Message {
    role: 'user' | 'ai';
    content: string;
    timestamp: number;
}

// 🔴 Your Key (No changes needed)
const API_KEY = "";

const genAI = new GoogleGenerativeAI(API_KEY);

export const getAIResponse = async (messages: Message[]): Promise<string> => {
    try {
        // 🟢 Key Modification: Using "gemini-3-flash-preview"
        // The Flash model has a massive free quota that is almost impossible to exhaust, and it is extremely fast!
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        // --- Core Fix Logic (Remains unchanged) ---
        // 1. Prepare history messages
        let historyMessages = messages.slice(0, -1);

        // 2. Fix the initial role of the conversation (Gemini requires the first message to be from 'user', not 'model')
        if (historyMessages.length > 0 && historyMessages[0].role === 'ai') {
            historyMessages = historyMessages.slice(1);
        }

        const history = historyMessages.map(msg => ({
            role: msg.role === 'ai' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));

        // 3. Start chat session
        const chat = model.startChat({
            history: history,
        });

        // 4. Send the latest message
        const lastUserMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastUserMessage);

        return result.response.text();

    } catch (error: any) {
        console.error("Gemini API Error:", error);

        // Error handling guide
        if (error.message.includes("429")) {
            return "⚠️ Quota Limit: You are chatting too fast! Please wait a moment.";
        }
        if (error.message.includes("404")) {
            // If 3-flash is unavailable, try switching to 2.0-flash
            return "⚠️ Model Not Found: Please try changing model to 'gemini-2.0-flash-exp' in the code.";
        }

        return `⚠️ Error: ${error.message}`;
    }
};