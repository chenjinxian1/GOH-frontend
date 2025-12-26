import { useState } from 'react';
import './FeedbackPage.css';

export default function FeedbackPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [agree, setAgree] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const canSubmit = message.trim().length > 0 && status !== 'submitting';

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        setStatus('submitting');

        // 暂时用 setTimeout 模拟后端提交
        setTimeout(() => {
            // 这里你以后可以改成真正的 axios.post('/api/feedback', { name, email, message, agree })
            setStatus('success');
            setMessage('');
            // name/email 根据需要决定是否清空
        }, 800);
    };

    return (
        <div className="feedback-page">
            <h1 className="feedback-title">User feedback</h1>
            <p className="feedback-subtitle">
                Tell us what works well and what we should improve. Your feedback helps us make this health assistant safer
                and easier to use.
            </p>

            <form className="feedback-form" onSubmit={handleSubmit}>
                <div className="feedback-row">
                    <label className="feedback-label" htmlFor="name">
                        Name (optional)
                    </label>
                    <input
                        id="name"
                        className="feedback-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                    />
                </div>

                <div className="feedback-row">
                    <label className="feedback-label" htmlFor="email">
                        Email (optional)
                    </label>
                    <input
                        id="email"
                        className="feedback-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                    />
                </div>

                <div className="feedback-row">
                    <label className="feedback-label" htmlFor="message">
                        How can we help?
                    </label>
                    <textarea
                        id="message"
                        className="feedback-textarea"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Describe an issue, suggestion or general feedback..."
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
                        I understand that this form is for general feedback only, not for urgent medical emergencies.
                    </label>
                </div>

                <div className="feedback-submit-row">
                    <button
                        type="submit"
                        className="feedback-submit-button"
                        disabled={!canSubmit}
                    >
                        {status === 'submitting' ? 'Submitting...' : 'Submit feedback'}
                    </button>

                    {status === 'success' && (
                        <span className="feedback-message success">
              Thanks for your feedback!
            </span>
                    )}
                    {status === 'error' && (
                        <span className="feedback-message error">
              Something went wrong. Please try again later.
            </span>
                    )}
                </div>
            </form>
        </div>
    );
}
