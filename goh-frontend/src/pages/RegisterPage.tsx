// src/pages/RegisterPage.tsx
import LoginPage from './LoginPage';

export default function RegisterPage() {
    // Reuse the LoginPage structure, but display the registration panel by default (initialSignUp={true})
    return <LoginPage initialSignUp={true} />;
}