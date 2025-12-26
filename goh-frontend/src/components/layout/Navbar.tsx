// src/components/layout/Navbar.tsx
import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo-goh.png';
// 🟢 引入我们刚才写的 Hook
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
    const { currentUser, userProfile, logout } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
    const menuRef = useRef<HTMLDivElement>(null);

    const handleLogout = async () => {
        await logout();
        setShowMenu(false);
        navigate('/'); // 登出后回首页
    };

    // 获取名字首字母作为头像占位符
    const getInitials = () => {
        return userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : 'U';
    };

    // 点击外部关闭菜单
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">
                    <img src={logo} alt="Guardians of Health" />
                    <span>Guardians of Health</span>
                </Link>
            </div>

            <div className="navbar-center">
                <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
                <NavLink to="/ai-assistant" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>AI Assistant</NavLink>
                <NavLink to="/science" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Health Science</NavLink>
                <NavLink to="/diseases" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Disease Info</NavLink>
                <NavLink to="/data-viz" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Data Viz</NavLink>
            </div>

            <div className="navbar-right">
                {/* 🟢 只有登录才显示 Write 按钮 */}
                {currentUser && (
                    <Link
                        to="/create"
                        style={{ marginRight: '20px', textDecoration: 'none', color: '#3b82f6', fontWeight: '600', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                        <span style={{fontSize: '18px', lineHeight: 1}}>+</span> Write
                    </Link>
                )}

                {/* 🟢 根据登录状态切换显示 */}
                {!currentUser ? (
                    <>
                        <Link to="/login" className="nav-button nav-button-outline">Sign in</Link>
                        <Link to="/register" className="nav-button nav-button-filled">Sign up</Link>
                    </>
                ) : (
                    <div className="user-menu-container" ref={menuRef}>
                        {/* 头像按钮 */}
                        <div className="avatar-btn" onClick={() => setShowMenu(!showMenu)}>
                            {userProfile?.photoURL ? (
                                <img src={userProfile.photoURL} alt="Avatar" />
                            ) : (
                                <div className="avatar-placeholder">{getInitials()}</div>
                            )}
                        </div>

                        {/* 🟢 仿 Google 下拉菜单 */}
                        {showMenu && (
                            <div className="google-menu">
                                <div className="menu-header">
                                    <div className="menu-email">{currentUser.email}</div>
                                    <div className="menu-avatar-large">
                                        {userProfile?.photoURL ? (
                                            <img src={userProfile.photoURL} alt="Avatar" />
                                        ) : (
                                            <div className="avatar-placeholder large">{getInitials()}</div>
                                        )}
                                    </div>
                                    <div className="menu-name">Hi, {userProfile?.name || 'User'}!</div>

                                    <button
                                        className="manage-btn"
                                        onClick={() => {
                                            navigate('/profile'); // 跳转去个人中心
                                            setShowMenu(false);
                                        }}
                                    >
                                        Manage your Account
                                    </button>
                                </div>

                                <div className="menu-footer">
                                    <button className="sign-out-btn" onClick={handleLogout}>
                                        <span style={{marginRight: '8px'}}>↪️</span> Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}