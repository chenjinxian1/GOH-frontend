// src/pages/AuthPage.tsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AuthPage.css';

// 🟢 1. Import sendPasswordResetEmail
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail, // 👈 Core function
    updateProfile,
    type AuthError
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export default function AuthPage() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isResetMode, setIsResetMode] = useState(false);

    // State for Login/Registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 🟢 State for Password Reset (only email required)
    const [resetEmail, setResetEmail] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/register') {
            setIsSignUp(true);
        } else {
            setIsSignUp(false);
        }
    }, [location]);

    const togglePanel = (status: boolean) => {
        setIsSignUp(status);
        setIsResetMode(false);
        // Clear inputs
        setEmail('');
        setPassword('');
        setName('');
        setResetEmail('');
        navigate(status ? '/register' : '/login', { replace: true });
    };

    const handleError = (error: AuthError) => {
        console.error("Firebase Error Code:", error.code);

        if (error.code === 'auth/network-request-failed') {
            alert("❌ Network Error. Please check your connection/proxy.");
            return;
        }

        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
                alert("❌ Account not found or incorrect password.");
                break;
            case 'auth/wrong-password':
                alert("❌ Incorrect password.");
                break;
            case 'auth/email-already-in-use':
                alert("❌ Email already registered. Please sign in.");
                break;
            case 'auth/weak-password':
                alert("❌ Password is too weak (min 6 chars).");
                break;
            case 'auth/invalid-email':
                alert("❌ Invalid email format.");
                break;
            default:
                alert(`❌ Error: ${error.message}`);
        }
    };

    // Handle Registration
    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password || !name) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            // Save to database
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                name: name,
                email: email,
                password: password, // Note: Storing plain text passwords is not recommended for production; kept per your request.
                role: "user",
                createdAt: new Date().toISOString()
            });

            alert(`🎉 Success! Account created for ${name}`);
            navigate('/');
        } catch (error: any) {
            handleError(error);
        }
    };

    // Handle Login
    const handleSignInSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error: any) {
            handleError(error);
        }
    };

    // 🟢 Handle sending reset email
    const handleResetSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!resetEmail) {
            alert("Please enter your email address.");
            return;
        }

        try {
            // Send reset link
            await sendPasswordResetEmail(auth, resetEmail);

            // Success prompt
            alert(`✅ Reset link sent to ${resetEmail}!\nPlease check your inbox (and spam folder).`);

            // Automatically switch back to the login interface
            setIsResetMode(false);

        } catch (error: any) {
            // 🟢 Catch error if email does not exist
            if (error.code === 'auth/user-not-found') {
                alert("❌ This email is not registered. Please create an account first.");
            } else {
                handleError(error);
            }
        }
    };

    return (
        <div className="auth-body">
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">

                {/* --- Sign Up Panel --- */}
                <div className="form-container sign-up-container">
                    <form onSubmit={handleSignUpSubmit}>
                        <h1>Create Account</h1>
                        <div style={{height: '20px'}}></div>
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
                        <button style={{marginTop: '20px'}}>Sign Up</button>
                    </form>
                </div>

                {/* --- Sign In / Reset Panel --- */}
                <div className="form-container sign-in-container">
                    <form onSubmit={isResetMode ? handleResetSubmit : handleSignInSubmit}>

                        {isResetMode ? (
                            // === 🟢 Password Reset Interface (Email only) ===
                            <>
                                <h1>Reset Password</h1>
                                <p style={{fontSize: '13px', color: '#666', margin: '10px 0 20px', maxWidth: '280px'}}>
                                    Enter your email and we'll send you a link to reset your password.
                                </p>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                />

                                <button style={{marginTop: '20px'}}>Send Reset Link</button>

                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); setIsResetMode(false); }}
                                    style={{marginTop: '15px', fontSize: '12px', color: '#333'}}
                                >
                                    ← Back to Sign In
                                </a>
                            </>
                        ) : (
                            // === Standard Login Interface ===
                            <>
                                <h1>Sign in</h1>
                                <div style={{height: '20px'}}></div>

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
                                    onClick={(e) => { e.preventDefault(); setIsResetMode(true); }}
                                    style={{margin: '15px 0'}}
                                >
                                    Forgot your password?
                                </a>
                                <button>Sign In</button>
                            </>
                        )}
                    </form>
                </div>

                {/* --- Overlay --- */}
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" type="button" onClick={() => togglePanel(false)}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" type="button" onClick={() => togglePanel(true)}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}