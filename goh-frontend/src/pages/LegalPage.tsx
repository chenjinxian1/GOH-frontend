// src/pages/LegalPage.tsx
import React from 'react';
import './LegalPages.css';

const LegalPage: React.FC = () => {
    return (
        <div className="legal-page-container">
            <div className="legal-content">
                <h1>Legal Notice & Disclaimer</h1>
                <p className="last-updated">Last Updated: December 26, 2025</p>

                <section className="critical-warning">
                    <h2>⚠️ IMPORTANT MEDICAL DISCLAIMER</h2>
                    <p><strong>Guardians of Health is an AI-powered informational tool, NOT a doctor.</strong></p>
                    <p>The content provided by this website, including text, graphics, images, and other material ("Content"), is for <strong>informational purposes only</strong>.</p>
                    <p><strong>NEVER DISREGARD PROFESSIONAL MEDICAL ADVICE OR DELAY IN SEEKING IT BECAUSE OF SOMETHING YOU HAVE READ ON THIS WEBSITE.</strong></p>
                    <p>If you think you may have a medical emergency, call your doctor or emergency services immediately.</p>
                </section>

                <section>
                    <h2>1. Accuracy of AI Content</h2>
                    <p>Our services use Artificial Intelligence (Google Gemini) to generate responses. While we strive for accuracy, AI can occasionally produce incorrect, misleading, or biased information ("hallucinations"). We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information.</p>
                </section>

                <section>
                    <h2>2. Limitation of Liability</h2>
                    <p>In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.</p>
                </section>

                <section>
                    <h2>3. Third-Party Links</h2>
                    <p>Through this website, you are able to link to other websites which are not under the control of Guardians of Health. We have no control over the nature, content and availability of those sites.</p>
                </section>
            </div>
        </div>
    );
};

export default LegalPage;