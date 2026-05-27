export type LLMMessage = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

export type LLMChatOptions = {
    temperature?: number;
    maxTokens?: number;
};

export type LLMErrorCode = 'missing_api_key' | 'request_failed' | 'unexpected_response';

export class LLMClientError extends Error {
    code: LLMErrorCode;

    constructor(code: LLMErrorCode, message: string) {
        super(message);
        this.name = 'LLMClientError';
        this.code = code;
    }
}

type LLMConfig = {
    provider: string;
    baseUrl: string;
    apiKey: string;
    model: string;
    temperature: number;
    maxTokens: number;
};

const DEFAULT_BASE_URL = 'https://api.openai.com/v1';
const DEFAULT_MODEL = 'gpt-4o-mini';
const DEFAULT_TEMPERATURE = 0.7;
const DEFAULT_MAX_TOKENS = 800;

function parseNumber(value: string | undefined, fallback: number): number {
    if (!value) return fallback;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeBaseUrl(value: string | undefined): string {
    const baseUrl = value?.trim() || DEFAULT_BASE_URL;
    return baseUrl.replace(/\/+$/, '');
}

function getLLMConfig(): LLMConfig {
    const apiKey = import.meta.env.VITE_LLM_API_KEY?.trim() || '';

    return {
        provider: import.meta.env.VITE_LLM_PROVIDER?.trim() || 'openai-compatible',
        baseUrl: normalizeBaseUrl(import.meta.env.VITE_LLM_API_BASE_URL),
        apiKey,
        model: import.meta.env.VITE_LLM_MODEL?.trim() || DEFAULT_MODEL,
        temperature: parseNumber(import.meta.env.VITE_LLM_TEMPERATURE, DEFAULT_TEMPERATURE),
        maxTokens: parseNumber(import.meta.env.VITE_LLM_MAX_TOKENS, DEFAULT_MAX_TOKENS),
    };
}

function isMissingApiKey(apiKey: string): boolean {
    return !apiKey || apiKey === 'your_api_key_here' || apiKey === 'replace_with_your_real_key_locally';
}

export async function sendLLMChat(
    messages: LLMMessage[],
    options: LLMChatOptions = {}
): Promise<string> {
    const config = getLLMConfig();

    if (isMissingApiKey(config.apiKey)) {
        throw new LLMClientError(
            'missing_api_key',
            'LLM API key is missing. Please configure VITE_LLM_API_KEY in your .env file.'
        );
    }

    // Warning: VITE_LLM_API_KEY is exposed in the browser in a frontend-only app.
    // For production, use a backend proxy to protect the API key.
    let response: Response;
    try {
        response = await fetch(`${config.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.apiKey}`,
            },
            body: JSON.stringify({
                model: config.model,
                messages,
                temperature: options.temperature ?? config.temperature,
                max_tokens: options.maxTokens ?? config.maxTokens,
            }),
        });
    } catch (error) {
        throw new LLMClientError(
            'request_failed',
            `Language model request failed for ${config.provider}: ${String(error)}`
        );
    }

    if (!response.ok) {
        let details = '';
        try {
            details = await response.text();
        } catch {
            details = 'No response body available.';
        }

        throw new LLMClientError(
            'request_failed',
            `Language model request failed for ${config.provider}: ${response.status} ${response.statusText}. ${details}`
        );
    }

    let data: unknown;
    try {
        data = await response.json();
    } catch (error) {
        throw new LLMClientError(
            'unexpected_response',
            `Unable to parse language model response: ${String(error)}`
        );
    }

    const content = (data as {
        choices?: Array<{ message?: { content?: unknown } }>;
    }).choices?.[0]?.message?.content;

    if (typeof content !== 'string' || !content.trim()) {
        throw new LLMClientError(
            'unexpected_response',
            'Unexpected response from the language model service.'
        );
    }

    return content;
}
