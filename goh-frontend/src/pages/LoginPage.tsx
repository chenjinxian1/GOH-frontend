// src/pages/LoginPage.tsx
import { useState, type FormEvent } from 'react';
import './AuthPage.css';

interface LoginPageProps {
    initialSignUp?: boolean;
}

export default function LoginPage({ initialSignUp = false }: LoginPageProps) {
    // 控制是否处于 "Sign Up" 状态（即右侧面板激活状态）
    const [isSignUp, setIsSignUp] = useState(initialSignUp);

    // 状态管理
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [agree, setAgree] = useState(false);

    // 切换到注册视图
    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    // 切换到登录视图
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
            {/* 核心容器：根据 isSignUp 状态添加 class 触发滑动 */}
            <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="container">

                {/* 注册表单区域 */}
                <div className="form-container sign-up-container">
                    <form className="auth-form" onSubmit={handleRegisterSubmit}>
                        <h1 className="auth-title">Create Account</h1>
                        {/* 社交图标已移除 */}
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

                {/* 登录表单区域 */}
                <div className="form-container sign-in-container">
                    <form className="auth-form" onSubmit={handleLoginSubmit}>
                        <h1 className="auth-title">Sign in</h1>
                        {/* 社交图标已移除 */}
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

                {/* 滑动覆盖层区域 */}
                <div className="overlay-container">
                    <div className="overlay">
                        {/* 左侧覆盖层（在显示注册表单时可见，提示去登录） */}
                        <div className="overlay-panel overlay-left">
                            <h1 className="auth-title">Welcome Back!</h1>
                            <p className="auth-desc">
                                To keep connected with us please login with your personal info
                            </p>
                            <button className="auth-btn ghost" onClick={handleSignInClick}>
                                Sign In
                            </button>
                        </div>

                        {/* 右侧覆盖层（在显示登录表单时可见，提示去注册） */}
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