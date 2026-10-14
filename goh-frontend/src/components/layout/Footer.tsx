
// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';
import { useHomeLanguage } from '../../context/HomeLanguageContext';
import { homeCopy } from '../../i18n/homeCopy';
import './Footer.css';

// Ensure paths are correct
import usmLogo from '../../assets/usm-logo.png';
import gohLogo from '../../assets/logo-goh.png';

export default function Footer() {
    const { language } = useHomeLanguage();
    const copy = homeCopy[language];
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-inner">
                {/* Left side: Logo + Title + Tagline */}
                <div className="footer-left">
                    <div className="footer-logos">
                        <img
                            src={usmLogo}
                            alt={copy.universityLogo}
                            className="footer-logo-img"
                        />
                        <img
                            src={gohLogo}
                            alt={copy.brandLogo}
                            className="footer-logo-img"
                        />
                    </div>

                    <div className="footer-project-text">
                        <div className="footer-project-title">{copy.brand}</div>
                        <div className="footer-project-tagline">{copy.footerTagline}</div>

                        <Link className="footer-project-feedback" to="/feedback">
                            {copy.footerFeedback} →
                        </Link>
                    </div>
                </div>

                {/* Right side: Team Member Information */}
                <div className="footer-right">
                    <div className="footer-column-title">{copy.footerTeam}</div>
                    <div className="footer-members-grid">
                        <div className="footer-member">
                            <div className="footer-member-name">Chen Jinxian</div>
                            <div className="footer-member-line">USM202308639</div>
                            <div className="footer-member-line">
                                chenjinxian443357848@student.usm.my
                            </div>
                        </div>

                        <div className="footer-member">
                            <div className="footer-member-name">Yangye</div>
                            <div className="footer-member-line">USM202309007</div>
                            <div className="footer-member-line">newtyang@student.usm.my</div>
                        </div>

                        <div className="footer-member">
                            <div className="footer-member-name">Wang Wenshuai</div>
                            <div className="footer-member-line">USM202312648</div>
                            <div className="footer-member-line">
                                wangwenshuai@student.usm.my
                            </div>
                        </div>

                        <div className="footer-member">
                            <div className="footer-member-name">Qonita Fiddin</div>
                            <div className="footer-member-line">USM202312606</div>
                            <div className="footer-member-line">
                                qonitafiddin@student.usm.my
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🟢 Modified bottom bar: contains copyright info and legal links */}
            <div className="footer-bottom">
                <div className="footer-copyright">
                    © {year} {copy.brand} · {copy.footerCopyright}
                </div>

                <div className="footer-legal-links">
                    <Link to="/privacy-policy">{copy.footerPrivacy}</Link>
                    <span className="footer-separator">|</span>
                    <Link to="/legal-notice">{copy.footerLegal}</Link>
                </div>
            </div>
        </footer>
    );
}
