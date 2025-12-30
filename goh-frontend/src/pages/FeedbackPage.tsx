// src/pages/FeedbackPage.tsx
import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config'; // Ensure this points to your correct firebase config path
import './FeedbackPage.css';

export default function FeedbackPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [agree, setAgree] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Validation logic: must have message, agreed to terms, and not currently submitting
    const canSubmit = message.trim().length > 0 && agree && status !== 'submitting';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;

        setStatus('submitting');

        try {
            // 🌟 Core Logic: Write to Firebase 🌟
            // This automatically creates a collection named "User_Feedback" in your database
            await addDoc(collection(db, "User_Feedback"), {
                name: name || 'Anonymous', // Save as Anonymous if name is empty
                email: email || 'Not provided',
                message: message,
                createdAt: serverTimestamp(), // Use server timestamp for accuracy
                userAgent: navigator.userAgent // Optional: Record user agent for debugging
            });

            setStatus('success');

            // Clear form after successful submission
            setName('');
            setEmail('');
            setMessage('');
            setAgree(false);

            // Reset status after 3 seconds to allow re-submission
            setTimeout(() => setStatus('idle'), 3000);

        } catch (error) {
            console.error("Error submitting feedback:", error);
            setStatus('error');
        }
    };

    return (
        <div className="feedback-page">
            <header className="feedback-header">
                <h1 className="feedback-title">We value your feedback</h1>
                <p className="feedback-subtitle">
                    Help us improve Guardians of Health. Your insights directly shape the future of our medical assistant.
                </p>
            </header>

            <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="feedback-row">
                    <label className="feedback-label" htmlFor="name">
                        Name <span style={{fontWeight:400, color:'#9ca3af'}}>(Optional)</span>
                    </label>
                    <input
                        id="name"
                        className="feedback-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. Strange"
                    />
                </div>

                <div className="feedback-row">
                    <label className="feedback-label" htmlFor="email">
                        Email <span style={{fontWeight:400, color:'#9ca3af'}}>(Optional)</span>
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="feedback-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="doctor@example.com"
                    />
                </div>

                <div className="feedback-row">
                    <label className="feedback-label" htmlFor="message">
                        How can we improve? <span style={{color:'#ef4444'}}>*</span>
                    </label>
                    <textarea
                        id="message"
                        className="feedback-textarea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="I found a bug on the home page..."
                        required
                    />
                </div>

                <div className="feedback-checkbox-row">
                    <input
                        id="agree"
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                    />
                    <label htmlFor="agree">
                        I understand that this form is for product feedback only.
                        <strong> For medical emergencies, please call your local emergency number immediately.</strong>
                    </label>
                </div>

                <div className="feedback-submit-row">
                    <button
                        type="submit"
                        className="feedback-submit-button"
                        disabled={!canSubmit}
                    >
                        {status === 'submitting' ? 'Sending Feedback...' : 'Submit Feedback'}
                    </button>

                    {status === 'success' && (
                        <div className="feedback-message success">
                            ✅ Thank you! Your feedback has been securely saved.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="feedback-message error">
                            ❌ Something went wrong. Please check your internet connection.
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}