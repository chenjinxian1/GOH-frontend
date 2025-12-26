// src/services/aiService.ts
import { GoogleGenerativeAI } from "@google/generative-ai";

export interface Message {
    role: 'user' | 'ai';
    content: string;
    timestamp: number;
}

// 🔴 你的 Key (不需要改)
const API_KEY = "AIzaSyDxBgUAJLrvuFhvD5Dg7Pq_UxkCGaKAQBI";

const genAI = new GoogleGenerativeAI(API_KEY);

export const getAIResponse = async (messages: Message[]): Promise<string> => {
    try {
        // 🟢 关键修改：改用 "gemini-3-flash-preview"
        // Flash 模型拥有巨大的免费配额，基本用不完，而且速度极快！
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

        // --- 核心修复逻辑 (保持不变) ---
        // 1. 准备历史消息
        let historyMessages = messages.slice(0, -1);

        // 2. 修正对话开头的角色 (Gemini 规定第一句不能是 AI)
        if (historyMessages.length > 0 && historyMessages[0].role === 'ai') {
            historyMessages = historyMessages.slice(1);
        }

        const history = historyMessages.map(msg => ({
            role: msg.role === 'ai' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }));

        // 3. 启动聊天
        const chat = model.startChat({
            history: history,
        });

        // 4. 发送最新消息
        const lastUserMessage = messages[messages.length - 1].content;
        const result = await chat.sendMessage(lastUserMessage);

        return result.response.text();

    } catch (error: any) {
        console.error("Gemini API Error:", error);

        // 错误处理指南
        if (error.message.includes("429")) {
            return "⚠️ Quota Limit: You are chatting too fast! Please wait a moment.";
        }
        if (error.message.includes("404")) {
            // 如果 3-flash 也不行，试试 2.0-flash
            return "⚠️ Model Not Found: Please try changing model to 'gemini-2.0-flash-exp' in the code.";
        }

        return `⚠️ Error: ${error.message}`;
    }
};