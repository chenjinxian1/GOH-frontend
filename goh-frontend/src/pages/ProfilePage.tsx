// src/pages/ProfilePage.tsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { updatePassword } from 'firebase/auth';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

export default function ProfilePage() {
    const { currentUser, userProfile, refreshProfile } = useAuth();
    const navigate = useNavigate();

    // State management
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    // Password states
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        if (userProfile) {
            setName(userProfile.name || '');
            setAge(userProfile.age || '');
            setGender(userProfile.gender || 'Not Specified');
        }
    }, [currentUser, userProfile, navigate]);

    // Get initials for the avatar placeholder
    const getInitials = () => {
        return name ? name.charAt(0).toUpperCase() : 'U';
    };

    const handleSaveProfile = async () => {
        if (!currentUser) return;
        try {
            await updateDoc(doc(db, "users", currentUser.uid), {
                name,
                age,
                gender
            });
            await refreshProfile();
            setIsEditing(false);
            alert("✅ Profile updated successfully!");
        } catch (error) {
            console.error(error);
            alert("❌ Failed to update profile.");
        }
    };

    const handleChangePassword = async () => {
        if (!newPass) return;
        if (newPass !== confirmPass) {
            alert("❌ Passwords do not match!");
            return;
        }
        if (!currentUser) return;

        try {
            await updatePassword(currentUser, newPass);
            alert("✅ Password changed successfully!");
            setNewPass('');
            setConfirmPass('');
        } catch (error: any) {
            alert("❌ Error: " + error.message);
        }
    };

    if (!userProfile) return <div className="loading-screen">Loading Profile...</div>;

    return (
        <div className="profile-page-container">
            <h1 className="page-title">Manage Account</h1>

            {/* 1. Profile Overview */}
            <div className="profile-header-card">
                {userProfile.photoURL ? (
                    <img src={userProfile.photoURL} alt="Avatar" className="header-avatar" />
                ) : (
                    <div className="header-avatar-placeholder">{getInitials()}</div>
                )}
                <div className="header-info">
                    <h2>{name || 'User'}</h2>
                    <p>{userProfile.email}</p>
                    <span className="header-role-badge">Member</span>
                </div>
            </div>

            {/* 2. Personal Information Settings */}
            <div className="section-card">
                <div className="card-header">
                    <h3>Personal Information</h3>
                    {!isEditing && (
                        <button className="btn-edit" onClick={() => setIsEditing(true)}>
                            ✏️ Edit Profile
                        </button>
                    )}
                </div>

                <div className="form-grid">
                    <div className="form-group full-width">
                        <label className="form-label">Email Address</label>
                        <input
                            type="text"
                            className="form-input"
                            value={userProfile.email}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={name}
                            disabled={!isEditing}
                            onChange={e => setName(e.target.value)}
                            placeholder="Your Name"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Age</label>
                        <input
                            type="text"
                            className="form-input"
                            value={age}
                            disabled={!isEditing}
                            onChange={e => setAge(e.target.value)}
                            placeholder="e.g. 24"
                        />
                    </div>

                    <div className="form-group full-width">
                        <label className="form-label">Gender</label>
                        <select
                            className="form-select"
                            value={gender}
                            disabled={!isEditing}
                            onChange={e => setGender(e.target.value)}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Non-binary">Non-binary</option>
                            <option value="Not Specified">Not Specified</option>
                        </select>
                    </div>
                </div>

                {isEditing && (
                    <div className="action-buttons">
                        <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                        <button className="btn-save" onClick={handleSaveProfile}>Save Changes</button>
                    </div>
                )}
            </div>

            {/* 3. Security Settings */}
            <div className="section-card">
                <div className="card-header">
                    <h3>Security & Password</h3>
                </div>

                <div className="form-grid">
                    <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={newPass}
                            onChange={e => setNewPass(e.target.value)}
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={confirmPass}
                            onChange={e => setConfirmPass(e.target.value)}
                            placeholder="Confirm new password"
                        />
                    </div>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{width: '200px'}}>
                        <button className="btn-update-pass" onClick={handleChangePassword}>
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}