// src/components/FavoriteButton.tsx
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

interface FavoriteButtonProps {
    articleId: string;
    title: string;
    type: 'health' | 'disease'; // Needed for linking back correctly
    imageUrl?: string;
    category?: string;
    className?: string; // To allow custom positioning (bottom-right etc)
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
                                                                  articleId,
                                                                  title,
                                                                  type,
                                                                  imageUrl,
                                                                  category,
                                                                  className
                                                              }) => {
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(false);

    // Check status on load
    useEffect(() => {
        const checkStatus = async () => {
            const user = auth.currentUser;
            if (!user) return;

            // Create a unique ID: userId_articleId
            const docRef = doc(db, "User_Favorites", `${user.uid}_${articleId}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setIsFavorited(true);
            }
        };
        checkStatus();
    }, [articleId]);

    const toggleFavorite = async (e: React.MouseEvent) => {
        // Prevent parent onClick (e.g., if the card is a link)
        e.preventDefault();
        e.stopPropagation();

        const user = auth.currentUser;
        if (!user) {
            alert("Please log in to bookmark articles.");
            return;
        }

        setLoading(true);
        const docId = `${user.uid}_${articleId}`;
        const docRef = doc(db, "User_Favorites", docId);

        try {
            if (isFavorited) {
                await deleteDoc(docRef);
                setIsFavorited(false);
            } else {
                await setDoc(docRef, {
                    userId: user.uid,
                    articleId,
                    title,
                    type,
                    imageUrl: imageUrl || '',
                    category: category || 'General',
                    timestamp: serverTimestamp()
                });
                setIsFavorited(true);
            }
        } catch (error) {
            console.error("Error updating favorite:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggleFavorite}
            disabled={loading}
            className={`fav-btn-component ${isFavorited ? 'active' : ''} ${className || ''}`}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
            style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
                zIndex: 10,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
        >
            <span style={{
                fontSize: '20px',
                color: isFavorited ? '#ef4444' : '#9ca3af',
                lineHeight: 1
            }}>
                {isFavorited ? '❤️' : '🤍'}
            </span>
        </button>
    );
};