// src/components/layout/Navbar.tsx
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useHomeLanguage } from '../../context/HomeLanguageContext';
import { homeCopy } from '../../i18n/homeCopy';
import './Navbar.css';

// 🟢 1. Import the logo image from the assets folder based on your screenshot
import logoImage from '../../assets/logo-goh.png';

export default function Navbar() {
    const { language, setLanguage } = useHomeLanguage();
    const copy = homeCopy[language];
    const { currentUser, userProfile, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isHome = location.pathname === '/';

    // Toggle dropdown
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // Get user initial
    const userInitial = userProfile?.name
        ? userProfile.name.charAt(0).toUpperCase()
        : currentUser?.email?.charAt(0).toUpperCase();

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    return (
        <nav className={`navbar ${isHome ? 'navbar-home' : 'navbar-standard'}`}>
            {/* 1. Left: Logo (Updated src) */}
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">
                    {/* 🟢 2. Use the imported image variable here */}
                    <img src={logoImage} alt={copy.brand} />
                    <span>{copy.brand}</span>
                </Link>
            </div>

            {/* 2. Center: Navigation Links */}
            <div className="navbar-center">
                <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>{copy.navHome}</Link>
                <Link to="/ai-assistant" className={`nav-link ${isActive('/ai-assistant') ? 'active' : ''}`}>{copy.navAssistant}</Link>
                <Link to="/science" className={`nav-link ${isActive('/science') || isActive('/articles') ? 'active' : ''}`}>{copy.navScience}</Link>
                <Link to="/diseases" className={`nav-link ${isActive('/diseases') || isActive('/disease') ? 'active' : ''}`}>{copy.navDiseases}</Link>
                <Link to="/data-viz" className={`nav-link ${isActive('/data-viz') ? 'active' : ''}`}>{copy.navData}</Link>
            </div>

            {/* 3. Right: User & Auth */}
            <div className="navbar-right">
                {isHome && (
                    <div className="language-switcher">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <circle cx="12" cy="12" r="9" />
                            <path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" />
                        </svg>
                        <select
                            aria-label="Homepage language / 首页语言"
                            value={language}
                            onChange={(event) => setLanguage(event.target.value === 'zh-CN' ? 'zh-CN' : 'en')}
                        >
                            <option value="en" lang="en">English</option>
                            <option value="zh-CN" lang="zh-CN">简体中文</option>
                        </select>
                    </div>
                )}
                {currentUser ? (
                    <div className="user-menu-container" ref={dropdownRef}>
                        <Link to="/create" className="write-btn">{copy.navWrite}</Link>

                        {/* Avatar Circle */}
                        <div className="avatar-btn" onClick={toggleDropdown}>
                            <div className="avatar-placeholder">
                                {userInitial}
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="user-dropdown">
                                <div className="dropdown-header">
                                    <p className="dropdown-email">{currentUser.email}</p>
                                    <div className="dropdown-avatar-large">{userInitial}</div>
                                    <h3>{copy.navGreeting}{userProfile?.name || copy.navUser}!</h3>
                                </div>

                                <div className="dropdown-actions">
                                    <Link
                                        to="/profile"
                                        className="dropdown-btn manage-account-btn"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >{copy.navAccount}</Link>

                                    <Link
                                        to="/favorites"
                                        className="dropdown-btn favorite-link-btn"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        💜 {copy.navFavorites}
                                    </Link>

                                    <button onClick={handleSignOut} className="dropdown-btn sign-out-btn">{copy.navSignOut}</button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="navbar-right-actions">
                        <Link to="/login" className="nav-button nav-button-outline">{copy.navLogin}</Link>
                        <Link to="/register" className="nav-button nav-button-filled">{copy.navGetStarted}</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
