import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProfilePage.css';

export default function ProfilePage() {
    const { currentUser, userProfile, updateLocalProfile, updateLocalPassword } = useAuth();

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    useEffect(() => {
        if (userProfile) {
            setName(userProfile.name || '');
            setAge(userProfile.age || '');
            setGender(userProfile.gender || 'Not Specified');
        }
    }, [userProfile]);

    const getInitials = () => {
        return name ? name.charAt(0).toUpperCase() : 'U';
    };

    const handleSaveProfile = async () => {
        setMessage(null);
        try {
            await updateLocalProfile({ name, age, gender });
            setIsEditing(false);
            setMessage({ type: 'success', text: 'Profile updated successfully.' });
        } catch (error) {
            setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update profile.' });
        }
    };

    const handleChangePassword = async () => {
        setMessage(null);
        if (!newPass) return;
        if (newPass !== confirmPass) {
            setMessage({ type: 'error', text: 'Passwords do not match.' });
            return;
        }

        try {
            await updateLocalPassword(newPass);
            setNewPass('');
            setConfirmPass('');
            setMessage({ type: 'success', text: 'Password changed successfully.' });
        } catch (error) {
            setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to update password.' });
        }
    };

    if (!currentUser || !userProfile) {
        return (
            <div className="profile-page-container">
                <div className="section-card profile-login-prompt">
                    <h1 className="page-title">Manage Account</h1>
                    <p>Please log in to view your profile.</p>
                    <Link className="btn-save profile-login-link" to="/login">Go to Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page-container">
            <h1 className="page-title">Manage Account</h1>

            {message && <div className={`profile-message ${message.type}`}>{message.text}</div>}

            <div className="profile-header-card">
                {userProfile.photoURL ? (
                    <img src={userProfile.photoURL} alt="Avatar" className="header-avatar" />
                ) : (
                    <div className="header-avatar-placeholder">{getInitials()}</div>
                )}
                <div className="header-info">
                    <h2>{name || 'User'}</h2>
                    <p>{userProfile.email}</p>
                    <p>Created: {new Date(userProfile.createdAt).toLocaleString()}</p>
                    <span className="header-role-badge">Local Demo Member</span>
                </div>
            </div>

            <div className="section-card">
                <div className="card-header">
                    <h3>Personal Information</h3>
                    {!isEditing && (
                        <button className="btn-edit" onClick={() => setIsEditing(true)}>
                            Edit Profile
                        </button>
                    )}
                </div>

                <div className="form-grid">
                    <div className="form-group full-width">
                        <label className="form-label">Email Address</label>
                        <input type="text" className="form-input" value={userProfile.email} disabled />
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
                    <div style={{ width: '200px' }}>
                        <button className="btn-update-pass" onClick={handleChangePassword}>
                            Update Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
