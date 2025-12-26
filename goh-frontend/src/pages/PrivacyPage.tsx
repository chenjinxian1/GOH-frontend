// src/pages/PrivacyPage.tsx
import React from 'react';
import './LegalPages.css'; // 稍后创建这个 CSS

const PrivacyPage: React.FC = () => {
    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1>Privacy Policy</h1>
                <p className="last-updated">Last Updated: December 26, 2025</p>

                <section>
                    <h2>1. Introduction</h2>
                    <p>Welcome to <strong>Guardians of Health</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights.</p>
                </section>

                <section>
                    <h2>2. Data We Collect</h2>
                    <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
                    <ul>
                        <li><strong>Identity Data:</strong> Includes username or similar identifier (if you log in).</li>
                        <li><strong>Health Data:</strong> Includes the symptoms and health questions you input into our AI chat interface.</li>
                        <li><strong>Usage Data:</strong> Includes information about how you use our website and services.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Data</h2>
                    <p>We use your data primarily to provide the AI health assistant service. Specifically:</p>
                    <ul>
                        <li>Your chat messages are sent to <strong>Google Gemini API</strong> to generate health responses.</li>
                        <li>Your chat history is stored securely on <strong>Google Firebase</strong> so you can access it later.</li>
                        <li>We do not sell your personal data to third parties.</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Data Security</h2>
                    <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way. Access to your personal data is limited to those employees, agents, contractors and other third parties who have a business need to know.</p>
                </section>

                <section>
                    <h2>5. Contact Us</h2>
                    <p>If you have any questions about this privacy policy, please contact us at: <strong>support@guardiansofhealth.com</strong></p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPage;