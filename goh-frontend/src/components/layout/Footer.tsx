// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom';
import './Footer.css';

// 确保路径正确
import usmLogo from '../../assets/usm-logo.png';
import gohLogo from '../../assets/logo-goh.png';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-inner">
                {/* 左侧：Logo + 标题 + 标语 */}
                <div className="footer-left">
                    <div className="footer-logos">
                        <img
                            src={usmLogo}
                            alt="Universiti Sains Malaysia logo"
                            className="footer-logo-img"
                        />
                        <img
                            src={gohLogo}
                            alt="Guardians of Health logo"
                            className="footer-logo-img"
                        />
                    </div>

                    <div className="footer-project-text">
                        <div className="footer-project-title">Guardians of Health</div>
                        <div className="footer-project-tagline">
                            We hope for a healthier tomorrow.
                        </div>

                        <Link className="footer-project-feedback" to="/feedback">
                            Share your feedback →
                        </Link>
                    </div>
                </div>

                {/* 右侧：组员信息 */}
                <div className="footer-right">
                    <div className="footer-column-title">Our Team Members</div>
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

            {/* 🟢 修改后的底部栏：包含版权信息和法律链接 */}
            <div className="footer-bottom">
                <div className="footer-copyright">
                    © {year} Guardians of Health · For education and research use only.
                </div>

                <div className="footer-legal-links">
                    <Link to="/privacy-policy">Privacy Policy</Link>
                    <span className="footer-separator">|</span>
                    <Link to="/legal-notice">Legal Notice & Disclaimer</Link>
                </div>
            </div>
        </footer>
    );
}
