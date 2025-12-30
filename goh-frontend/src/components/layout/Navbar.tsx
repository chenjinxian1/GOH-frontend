// src/components/layout/Navbar.tsx
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';
import './Navbar.css';

// 🟢 1. Import the logo image from the assets folder based on your screenshot
import logoImage from '../../assets/logo-goh.png';

export default function Navbar() {
    const { currentUser, userProfile } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    // Get user initial
    const userInitial = userProfile?.name
        ? userProfile.name.charAt(0).toUpperCase()
        : currentUser?.email?.charAt(0).toUpperCase();

    return (
        <nav className="navbar">
            {/* 1. Left: Logo (Updated src) */}
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">
                    {/* 🟢 2. Use the imported image variable here */}
                    <img src={logoImage} alt="Guardians of Health" />
                    <span>Guardians of Health</span>
                </Link>
            </div>

            {/* 2. Center: Navigation Links */}
            <div className="navbar-center">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/ai-assistant" className="nav-link">AI Assistant</Link>
                <Link to="/science" className="nav-link">Health Science</Link>
                <Link to="/diseases" className="nav-link">Disease Info</Link>
                <Link to="/data-viz" className="nav-link">Data Viz</Link>
            </div>

            {/* 3. Right: User & Auth */}
            <div className="navbar-right">
                {currentUser ? (
                    <div className="user-menu-container" ref={dropdownRef}>
                        <Link to="/create" className="write-btn">+ Write</Link>

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
                                    <h3>Hi, {userProfile?.name || 'User'}!</h3>
                                </div>

                                <div className="dropdown-actions">
                                    <Link
                                        to="/profile"
                                        className="dropdown-btn manage-account-btn"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Manage your Account
                                    </Link>

                                    <Link
                                        to="/favorites"
                                        className="dropdown-btn favorite-link-btn"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        💜 My Favorite
                                    </Link>

                                    <button onClick={handleSignOut} className="dropdown-btn sign-out-btn">
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="navbar-right-actions">
                        <Link to="/login" className="nav-button nav-button-outline">Log In</Link>
                        <Link to="/register" className="nav-button nav-button-filled">Get Started</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}