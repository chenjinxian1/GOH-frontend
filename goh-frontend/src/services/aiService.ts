import { LLMClientError, sendLLMChat, type LLMMessage } from './llmClient';

export interface Message {
    role: 'user' | 'ai';
    content: string;
    timestamp: number;
}

const SYSTEM_PROMPT =
    'You are Guardians of Health AI Assistant. You provide general health education and wellness information in a clear, friendly, and cautious way. You do not diagnose diseases, prescribe medication, or replace professional medical advice. For urgent or serious symptoms, advise the user to seek help from a qualified healthcare professional.';

const ERROR_MESSAGES = {
    missing_api_key: 'LLM API key is missing. Please configure VITE_LLM_API_KEY in your .env file.',
    request_failed:
        'Sorry, the AI assistant is temporarily unavailable. Please check your API configuration or try again later.',
    unexpected_response: 'Unexpected response from the language model service.',
} as const;

function toLLMMessages(messages: Message[]): LLMMessage[] {
    return [
        {
            role: 'system',
            content: SYSTEM_PROMPT,
        },
        ...messages
            .filter((message) => message.content.trim())
            .map<LLMMessage>((message) => ({
                role: message.role === 'ai' ? 'assistant' : 'user',
                content: message.content,
            })),
    ];
}

export const getAIResponse = async (messages: Message[]): Promise<string> => {
    try {
        return await sendLLMChat(toLLMMessages(messages));
    } catch (error) {
        console.error('LLM API Error:', error);

        if (error instanceof LLMClientError) {
            return ERROR_MESSAGES[error.code];
        }

        return ERROR_MESSAGES.request_failed;
    }
};
