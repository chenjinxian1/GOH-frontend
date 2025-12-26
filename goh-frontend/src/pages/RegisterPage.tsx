// src/pages/RegisterPage.tsx
import LoginPage from './LoginPage';

export default function RegisterPage() {
    // 复用 LoginPage 的结构，但默认显示注册面板（initialSignUp={true}）
    return <LoginPage initialSignUp={true} />;
}