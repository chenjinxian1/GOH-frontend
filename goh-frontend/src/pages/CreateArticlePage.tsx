// src/pages/CreateArticlePage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import './CreateArticlePage.css';

export default function CreateArticlePage() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [section, setSection] = useState<'science' | 'disease'>('science');

    // Category data
    const scienceCategories = ['General Health', 'Mental Health', 'Nutrition', 'Disease Prevention'];
    const diseaseCategories = ['Infectious Diseases', 'Chronic Conditions', 'Genetic Disorders', 'Viral Infections', 'Other'];
    const currentCategories = section === 'science' ? scienceCategories : diseaseCategories;

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        readTime: '',
        summary: '',
        content: '',
        imageUrl: ''
    });

    useEffect(() => {
        setFormData(prev => ({ ...prev, category: currentCategories[0] }));
    }, [section]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleExit = () => {
        navigate('/');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            alert("Please login to publish.");
            return;
        }

        setIsSubmitting(true);
        try {
            const collectionName = section === 'science' ? 'articles' : 'Disease_Information';

            const docData = {
                ...formData,
                author: currentUser.displayName || currentUser.email?.split('@')[0] || "Editor",
                userId: currentUser.uid,
                publishDate: new Date().toISOString().split('T')[0],
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, collectionName), docData);

            alert(`🎉 Published to ${section === 'science' ? 'Health Knowledge' : 'Disease Info'}!`);
            setTimeout(() => {
                navigate(section === 'science' ? '/science' : '/diseases');
            }, 1000);

        } catch (error) {
            console.error("Error:", error);
            alert("Failed to publish.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // 🟢 Key Fix: Logic for getting avatar initials
    // Priority given to displayName, then email prefix
    const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || "G";
    const userInitial = displayName.charAt(0).toUpperCase();

    return (
        <div className="create-overlay-container">
            <header className="immersive-header">
                <div className="header-left">
                    <button className="exit-btn" onClick={handleExit}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'6px'}}>
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Exit
                    </button>
                </div>

                <div className="header-right">
                    {/* 🟢 Modified: Removed text greeting, kept avatar only to maintain consistency with the homepage */}
                    <div className="user-avatar-circle" title={displayName}>
                        {userInitial}
                    </div>
                </div>
            </header>

            <div className="scroll-area">
                <div className="form-card">
                    <h1 className="page-title">Create New Content</h1>

                    <div className="section-toggle-container">
                        <button
                            type="button"
                            className={`toggle-btn ${section === 'science' ? 'active' : ''}`}
                            onClick={() => setSection('science')}
                        >
                            📘 Health Knowledge
                        </button>
                        <button
                            type="button"
                            className={`toggle-btn ${section === 'disease' ? 'active' : ''}`}
                            onClick={() => setSection('disease')}
                        >
                            🧬 Disease Info
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group" style={{flex: 2}}>
                                <label className="form-label">Title</label>
                                <input
                                    className="form-input"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter article title"
                                    required
                                />
                            </div>
                            <div className="form-group" style={{flex: 1}}>
                                <label className="form-label">Category</label>
                                <select
                                    className="form-select"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    {currentCategories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group" style={{flex: 1}}>
                                <label className="form-label">Read Time</label>
                                <input
                                    className="form-input"
                                    name="readTime"
                                    value={formData.readTime}
                                    onChange={handleChange}
                                    placeholder="e.g. 5 min read"
                                    required
                                />
                            </div>
                            <div className="form-group" style={{flex: 2}}>
                                <label className="form-label">Image URL</label>
                                <input
                                    className="form-input"
                                    name="imageUrl"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Summary</label>
                            <textarea
                                className="form-textarea"
                                name="summary"
                                rows={3}
                                value={formData.summary}
                                onChange={handleChange}
                                placeholder="Short description..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Content (Markdown)</label>
                            <textarea
                                className="form-textarea"
                                name="content"
                                rows={10}
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="# Write content here..."
                                style={{fontFamily: 'monospace'}}
                                required
                            />
                        </div>

                        <button type="submit" className="publish-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Publishing...' : `Publish to ${section === 'science' ? 'Health Knowledge' : 'Disease Info'}`}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}