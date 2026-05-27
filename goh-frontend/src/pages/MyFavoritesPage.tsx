import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FavoriteButton } from '../components/FavoriteButton';
import './MyFavoritesPage.css';

const FAVORITES_KEY = 'goh_favorites';

interface FavItem {
    id: string;
    userId: string;
    articleId: string;
    title: string;
    type: 'health' | 'disease';
    imageUrl?: string;
    category?: string;
    timestamp?: string;
}

const readFavorites = (): FavItem[] => {
    try {
        return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]') as FavItem[];
    } catch (error) {
        console.error('Failed to parse local favorites:', error);
        return [];
    }
};

export default function MyFavoritesPage() {
    const { currentUser } = useAuth();
    const [favorites, setFavorites] = useState<FavItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }

        const data = readFavorites()
            .filter((item) => item.userId === currentUser.uid)
            .sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));
        setFavorites(data);
        setLoading(false);
    }, [currentUser, navigate]);

    if (loading) return <div style={{ textAlign: 'center', padding: '60px' }}>Loading...</div>;

    return (
        <div className="fav-page-container">
            <header className="fav-header">
                <h1>My Favorite Collection</h1>
                <p>All your saved articles in one place.</p>
            </header>

            {favorites.length > 0 ? (
                <div className="fav-list-layout">
                    {favorites.map(item => (
                        <div key={item.id} className="fav-card-wrapper">
                            <Link
                                to={item.type === 'disease' ? `/disease/${item.articleId}` : `/health/${item.articleId}`}
                                className="fav-card-link"
                            >
                                <article className="fav-article-card">
                                    <div className="fav-image-wrapper">
                                        <img
                                            src={item.imageUrl || '/placeholder.png'}
                                            alt={item.title}
                                        />
                                        <span className={`fav-category-badge ${item.type}`}>
                                            {item.category || (item.type === 'disease' ? 'Disease Info' : 'Health')}
                                        </span>
                                    </div>

                                    <div className="fav-content">
                                        <h3>{item.title}</h3>
                                        <p className="fav-type-label">
                                            {item.type === 'disease' ? 'Infectious Diseases & Prevention' : 'General Health Knowledge'}
                                        </p>
                                        <span className="fav-read-more">Read Article →</span>
                                    </div>
                                </article>
                            </Link>

                            <div className="floating-fav-btn">
                                <FavoriteButton
                                    articleId={item.articleId}
                                    title={item.title}
                                    type={item.type}
                                    imageUrl={item.imageUrl}
                                    category={item.category}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state">
                    <p>No favorites yet. Go explore!</p>
                    <div className="empty-actions">
                        <Link to="/science" className="btn-explore">Browse Health</Link>
                        <Link to="/diseases" className="btn-explore">Browse Diseases</Link>
                    </div>
                </div>
            )}
        </div>
    );
}
