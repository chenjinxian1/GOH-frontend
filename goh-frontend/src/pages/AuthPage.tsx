import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AuthPage.css';

export default function AuthPage() {
    const { login, register } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [isResetMode, setIsResetMode] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        setIsSignUp(location.pathname === '/register');
        setIsResetMode(false);
        setMessage(null);
    }, [location.pathname]);

    const togglePanel = (status: boolean) => {
        setIsSignUp(status);
        setIsResetMode(false);
        setEmail('');
        setPassword('');
        setName('');
        setResetEmail('');
        setMessage(null);
        navigate(status ? '/register' : '/login', { replace: true });
    };

    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        try {
            await register(name, email, password);
            setMessage({ type: 'success', text: `Account created for ${name.trim()}.` });
            navigate('/profile');
        } catch (error) {
            setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Registration failed.' });
        }
    };

    const handleSignInSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        try {
            await login(email, password);
            setMessage({ type: 'success', text: 'Signed in successfully.' });
            navigate('/profile');
        } catch (error) {
            setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Login failed.' });
        }
    };

    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (!resetEmail.trim()) {
            setMessage({ type: 'error', text: 'Please enter your email address.' });
            return;
        }

        try {
            const users = JSON.parse(localStorage.getItem('goh_users') || '[]') as Array<{ email: string }>;
            const exists = users.some((user) => user.email.toLowerCase() === resetEmail.trim().toLowerCase());
            if (!exists) {
                setMessage({ type: 'error', text: 'User not found.' });
                return;
            }

            setMessage({
                type: 'success',
                text: 'Demo mode: password reset is unavailable locally. Please create a new demo account if needed.',
            });
            setIsResetMode(false);
        } catch {
            setMessage({ type: 'error', text: 'Unable to read local demo users.' });
        }
    };

    return (
        <div className="auth-body">
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUpSubmit}>
                        <h1>Create Account</h1>
                        <p className="auth-form-subtitle">Create a local demo account for this device.</p>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" style={{ marginTop: '20px' }}>Sign Up</button>
                        {message && isSignUp && <div className={`auth-message ${message.type}`}>{message.text}</div>}
                    </form>
                </div>

                <div className="form-container sign-in-container">
                    <form onSubmit={isResetMode ? handleResetSubmit : handleSignInSubmit}>
                        {isResetMode ? (
                            <>
                                <h1>Reset Password</h1>
                                <p className="auth-form-subtitle">
                                    Local demo mode cannot send email reset links.
                                </p>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                />
                                <button type="submit" style={{ marginTop: '20px' }}>Check Demo Account</button>
                                {message && !isSignUp && <div className={`auth-message ${message.type}`}>{message.text}</div>}
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setIsResetMode(false); setMessage(null); }}
                                    style={{ marginTop: '15px', fontSize: '12px', color: '#334155' }}
                                >
                                    Back to Sign In
                                </a>
                            </>
                        ) : (
                            <>
                                <h1>Sign in</h1>
                                <p className="auth-form-subtitle">Use your local demo account.</p>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setIsResetMode(true); setMessage(null); }}
                                    style={{ margin: '15px 0' }}
                                >
                                    Forgot your password?
                                </a>
                                <button type="submit">Sign In</button>
                                {message && !isSignUp && <div className={`auth-message ${message.type}`}>{message.text}</div>}
                            </>
                        )}
                    </form>
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>Sign in to continue exploring your health learning workspace.</p>
                            <button className="ghost" type="button" onClick={() => togglePanel(false)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Create a local demo account and start your learning journey.</p>
                            <button className="ghost" type="button" onClick={() => togglePanel(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
