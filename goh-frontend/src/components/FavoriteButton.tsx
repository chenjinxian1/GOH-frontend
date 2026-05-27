import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const FAVORITES_KEY = 'goh_favorites';

interface FavoriteButtonProps {
    articleId: string;
    title: string;
    type: 'health' | 'disease';
    imageUrl?: string;
    category?: string;
    className?: string;
}

interface LocalFavorite {
    id: string;
    userId: string;
    articleId: string;
    title: string;
    type: 'health' | 'disease';
    imageUrl?: string;
    category?: string;
    timestamp: string;
}

const readFavorites = (): LocalFavorite[] => {
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]') as LocalFavorite[];
    } catch (error) {
        console.error('Failed to parse local favorites:', error);
        return [];
    }
};

const writeFavorites = (favorites: LocalFavorite[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
    articleId,
    title,
    type,
    imageUrl,
    category,
    className
}) => {
    const { currentUser } = useAuth();
    const [isFavorited, setIsFavorited] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            setIsFavorited(false);
            return;
        }

        const docId = `${currentUser.uid}_${articleId}`;
        setIsFavorited(readFavorites().some((favorite) => favorite.id === docId));
    }, [articleId, currentUser]);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!currentUser) {
            alert("Please log in to bookmark articles.");
            return;
        }

        setLoading(true);
        const docId = `${currentUser.uid}_${articleId}`;
        const favorites = readFavorites();

        if (isFavorited) {
            writeFavorites(favorites.filter((favorite) => favorite.id !== docId));
            setIsFavorited(false);
        } else {
            writeFavorites([
                ...favorites,
                {
                    id: docId,
                    userId: currentUser.uid,
                    articleId,
                    title,
                    type,
                    imageUrl: imageUrl || '',
                    category: category || 'General',
                    timestamp: new Date().toISOString(),
                },
            ]);
            setIsFavorited(true);
        }

        setLoading(false);
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
                {isFavorited ? '♥' : '♡'}
            </span>
        </button>
    );
};
