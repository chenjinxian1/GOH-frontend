// src/pages/LoginPage.tsx
import { useState, type FormEvent } from 'react';
import './AuthPage.css';

interface LoginPageProps {
    initialSignUp?: boolean;
}

export default function LoginPage({ initialSignUp = false }: LoginPageProps) {
    // Controls whether it is in "Sign Up" state (activating the right panel)
    const [isSignUp, setIsSignUp] = useState(initialSignUp);

    // State management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [agree, setAgree] = useState(false);

    // Switch to Sign Up view
    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    // Switch to Sign In view
    const handleSignInClick = () => {
        setIsSignUp(false);
    };

    const handleLoginSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert('Login functionality to be implemented.');
    };

    const handleRegisterSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!agree) {
            alert('Please agree to the study terms.');
            return;
        }
        alert('Register functionality to be implemented.');
    };

    return (
        <div className="auth-wrapper">
            {/* Core container: adds the 'right-panel-active' class based on isSignUp state to trigger sliding animation */}
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">

                {/* Sign Up Form Area */}
                <div className="form-container sign-up-container">
                    <form className="auth-form" onSubmit={handleRegisterSubmit}>
                        <h1 className="auth-title">Create Account</h1>
                        {/* Social icons removed */}
                        <span className="auth-sub">or use your email for registration</span>

                        <input
                            className="auth-input"
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            className="auth-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <label className="auth-checkbox-container">
                            <input
                                type="checkbox"
                                checked={agree}
                                onChange={(e) => setAgree(e.target.checked)}
                            />
                            I agree to study terms
                        </label>

                        <button className="auth-btn">Sign Up</button>
                    </form>
                </div>

                {/* Sign In Form Area */}
                <div className="form-container sign-in-container">
                    <form className="auth-form" onSubmit={handleLoginSubmit}>
                        <h1 className="auth-title">Sign in</h1>
                        {/* Social icons removed */}
                        <span className="auth-sub">or use your email account</span>

                        <input
                            className="auth-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="auth-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <a href="#" className="auth-sub" style={{textDecoration: 'none', color: '#333', marginTop: '10px'}}>
                            Forgot your password?
                        </a>

                        <button className="auth-btn">Sign In</button>
                    </form>
                </div>

                {/* Sliding Overlay Area */}
                <div className="overlay-container">
                    <div className="overlay">
                        {/* Left Overlay (Visible when showing the registration form, prompts to sign in) */}
                        <div className="overlay-panel overlay-left">
                            <h1 className="auth-title">Welcome Back!</h1>
                            <p className="auth-desc">
                                To keep connected with us please login with your personal info
                            </p>
                            <button className="auth-btn ghost" onClick={handleSignInClick}>
                                Sign In
                            </button>
                        </div>

                        {/* Right Overlay (Visible when showing the login form, prompts to sign up) */}
                        <div className="overlay-panel overlay-right">
                            <h1 className="auth-title">Hello, Friend!</h1>
                            <p className="auth-desc">
                                Enter your personal details and start journey with us
                            </p>
                            <button className="auth-btn ghost" onClick={handleSignUpClick}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}