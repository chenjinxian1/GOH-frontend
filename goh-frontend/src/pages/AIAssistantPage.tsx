// src/pages/AIAssistantPage.tsx
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import {
    collection, addDoc, query, where, orderBy, onSnapshot,
    updateDoc, doc, serverTimestamp, deleteDoc
} from 'firebase/firestore';
import { getAIResponse, type Message } from '../services/aiService';
import './AIAssistantPage.css';

// Import Markdown rendering components
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatSession {
    id: string;
    title: string;
    userId: string;
    createdAt: any;
    messages: Message[];
}

// Suggested questions configuration
const SUGGESTIONS = [
    { icon: "🤒", text: "Symptoms of Dengue" },
    { icon: "🥗", text: "Healthy Diet Plan" },
    { icon: "💉", text: "Vaccination Schedule" },
    { icon: "🏥", text: "Clinics Nearby" },
    { icon: "💊", text: "How to lower blood pressure" },
    { icon: "🧘‍♀️", text: "Stress relief tips" }
];

export default function AIAssistantPage() {
    const { currentUser } = useAuth();
    const locationState = useLocation();

    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState<ChatSession[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);

    // Store user location
    const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
    const [locationError, setLocationError] = useState<string>("");

    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: 'Hello! I am your AI health assistant. How can I help you today?', timestamp: Date.now() }
    ]);

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const hasAutoSentRef = useRef(false);

    // 1. Get browser GPS location
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLocationError("Location access denied.");
                }
            );
        } else {
            setLocationError("Geolocation is not supported.");
        }
    }, []);

    // 2. Listen to chat history changes
    useEffect(() => {
        if (!currentUser) {
            setChatHistory([]);
            return;
        }
        const q = query(
            collection(db, "chats"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const history = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as ChatSession[];
            setChatHistory(history);
        });
        return () => unsubscribe();
    }, [currentUser]);

    // 3. Auto-scroll to bottom
    useEffect(() => {
        if (chatContainerRef.current) {
            const container = chatContainerRef.current;
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }
    }, [messages, isLoading]);

    // 4. Send message logic
    const handleSendMessage = async (textOverride?: string) => {
        const textToSend = typeof textOverride === 'string' ? textOverride : input;

        if (!textToSend.trim()) return;
        if (isLoading) return;

        if (typeof textOverride !== 'string') {
            setInput('');
        }

        const userMsg: Message = { role: 'user', content: textToSend, timestamp: Date.now() };
        // Update local state first to prevent undefined errors
        const newHistory = [...messages, userMsg];
        setMessages(newHistory);

        setIsLoading(true);

        try {
            const aiContent = await getAIResponse(newHistory);
            const aiMsg: Message = { role: 'ai', content: aiContent, timestamp: Date.now() };
            const finalMessages = [...newHistory, aiMsg];

            setMessages(finalMessages);

            // Save to database
            if (currentUser) {
                if (currentChatId) {
                    const chatRef = doc(db, "chats", currentChatId);
                    await updateDoc(chatRef, { messages: finalMessages });
                } else {
                    const title = userMsg.content.slice(0, 30) + (userMsg.content.length > 30 ? '...' : '');
                    const docRef = await addDoc(collection(db, "chats"), {
                        userId: currentUser.uid,
                        title: title,
                        messages: finalMessages,
                        createdAt: serverTimestamp()
                    });
                    setCurrentChatId(docRef.id);
                }
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { role: 'ai', content: "Sorry, network error.", timestamp: Date.now() }]);
        } finally {
            setIsLoading(false);
        }
    };

    // 5. Listen for queries passed from the home page
    useEffect(() => {
        if (locationState.state?.initialQuery && !hasAutoSentRef.current) {
            const query = locationState.state.initialQuery;
            hasAutoSentRef.current = true;
            window.history.replaceState({}, document.title);
            handleSendMessage(query);
        }
    }, [locationState]);

    // Chat management
    const handleSelectChat = (chat: ChatSession) => {
        setCurrentChatId(chat.id);
        setMessages(chat.messages);
    };

    const handleNewChat = () => {
        setCurrentChatId(null);
        setMessages([
            { role: 'ai', content: 'Hello! I am your AI health assistant. How can I help you today?', timestamp: Date.now() }
        ]);
        hasAutoSentRef.current = false;
    };

    const handleDeleteChat = async (e: React.MouseEvent, chatId: string) => {
        e.stopPropagation();
        if (!window.confirm("Delete this chat?")) return;
        try {
            await deleteDoc(doc(db, "chats", chatId));
            if (currentChatId === chatId) handleNewChat();
        } catch (error) { console.error(error); }
    };

    // 🟢 6. Construct Map URL (Core modification: added &hl=en)
    const mapSrc = userLocation
        ? `https://maps.google.com/maps?q=${userLocation.lat},${userLocation.lng}&z=14&output=embed&hl=en`
        : `https://maps.google.com/maps?q=clinics+near+me&z=13&output=embed&hl=en`;

    return (
        <div className="ai-page-container">
            <header className="ai-header">
                <h1>AI Health Assistant</h1>
                <p>Ask general health questions and get educational guidance in a clear, cautious way.</p>
            </header>

            <div className="ai-content-wrapper">
                {/* Left Sidebar */}
                <aside className="ai-sidebar">
                    <div className="sidebar-chat-section">
                        <div className="sidebar-header">
                            <h3>History</h3>
                            <button className="new-chat-btn" onClick={handleNewChat} title="New Chat">＋</button>
                        </div>
                        <div className="chat-list">
                            {!currentUser && <div style={{padding:'10px', fontSize:'12px', color:'#999'}}>Login to save history</div>}
                            {chatHistory.map((chat) => (
                                <div key={chat.id} className={`chat-item ${currentChatId === chat.id ? 'active' : ''}`} onClick={() => handleSelectChat(chat)}>
                                    <div className="chat-item-title"><span className="chat-icon">💬</span>{chat.title}</div>
                                    <button className="delete-chat-btn" onClick={(e) => handleDeleteChat(e, chat.id)}>🗑️</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="sidebar-map-section">
                        <div className="sidebar-header" style={{border: 'none', paddingBottom: 0, marginBottom: 10}}>
                            <h3>Nearby Clinics</h3>
                        </div>
                        <div className="map-container" style={{position: 'relative'}}>
                            {/* Map Iframe */}
                            <iframe
                                title="Nearby Clinics"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                style={{border:0}}
                                src={mapSrc}
                                allowFullScreen
                                loading="lazy"
                            ></iframe>

                            {/* Prompt when location is not yet acquired */}
                            {!userLocation && !locationError && (
                                <div style={{
                                    position: 'absolute', bottom: 10, left: 10, right: 10,
                                    background: 'rgba(255,255,255,0.9)', padding: '5px 10px',
                                    fontSize: '11px', borderRadius: '4px', textAlign: 'center', color: '#666'
                                }}>
                                    📍 Asking for location permission...
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Right Main Chat Area */}
                <main className="ai-chat-main">
                    <div className="chat-messages-area" ref={chatContainerRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`message-wrapper ${msg.role === 'ai' ? 'bot' : 'user'}`}>
                                {msg.role === 'ai' && <div className="avatar bot-avatar">🤖</div>}
                                <div className="message-content-col">
                                    {msg.role === 'ai' && index === 0 && <div className="bot-header">GOH Assistant <span className="status-badge">ONLINE</span></div>}

                                    {/* Markdown Rendered Content */}
                                    <div className={`bubble-content ${msg.role === 'ai' ? 'markdown-body' : ''}`}>
                                        {msg.role === 'ai' ? (
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                components={{ a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" /> }}
                                            >
                                                {msg.content}
                                            </ReactMarkdown>
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message-wrapper bot">
                                <div className="avatar bot-avatar">🤖</div>
                                <div className="bubble-content" style={{fontStyle:'italic', color:'#999'}}>Thinking...</div>
                            </div>
                        )}
                    </div>

                    <div className="chat-input-wrapper">
                        {/* Suggested Questions */}
                        <div className="suggestions-wrapper">
                            {SUGGESTIONS.map((item, index) => (
                                <button key={index} className="suggestion-chip" onClick={() => handleSendMessage(item.text)} disabled={isLoading}>
                                    {item.icon} {item.text}
                                </button>
                            ))}
                        </div>

                        {/* Input Container */}
                        <div className="input-container">
                            <input
                                type="text"
                                placeholder={currentUser ? "Type a message..." : "Please login to save history..."}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <button className="send-btn" onClick={() => handleSendMessage()} disabled={isLoading}>
                                <svg className="send-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
