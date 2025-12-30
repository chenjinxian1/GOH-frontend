// src/pages/MyFavoritesPage.tsx
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import { FavoriteButton } from '../components/FavoriteButton';
import './MyFavoritesPage.css';

interface FavItem {
    id: string; // doc ID
    articleId: string;
    title: string;
    type: 'health' | 'disease';
    imageUrl?: string;
    category?: string;
}

export default function MyFavoritesPage() {
    const [favorites, setFavorites] = useState<FavItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchFavs = async () => {
            try {
                const q = query(
                    collection(db, "User_Favorites"),
                    where("userId", "==", user.uid),
                    orderBy("timestamp", "desc")
                );
                const snapshot = await getDocs(q);
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as FavItem[];
                setFavorites(data);
            } catch (err) {
                console.error("Error fetching favorites:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavs();
    }, [navigate]);

    if (loading) return <div style={{textAlign:'center', padding:'60px'}}>Loading...</div>;

    return (
        <div className="fav-page-container">
            <header className="fav-header">
                <h1>My Favorite Collection</h1>
                <p>All your saved articles in one place.</p>
            </header>

            {favorites.length > 0 ? (
                // 🟢 Using the same layout class as Health Science
                <div className="fav-list-layout">
                    {favorites.map(item => (
                        <div key={item.id} className="fav-card-wrapper">
                            {/* Link Logic: Determine path based on type */}
                            <Link
                                to={item.type === 'disease' ? `/disease/${item.articleId}` : `/health/${item.articleId}`}
                                className="fav-card-link"
                            >
                                <article className="fav-article-card">
                                    {/* Left Side: Image */}
                                    <div className="fav-image-wrapper">
                                        <img
                                            src={item.imageUrl || '/placeholder.png'}
                                            alt={item.title}
                                        />
                                        <span className={`fav-category-badge ${item.type}`}>
                                            {item.category || (item.type === 'disease' ? 'Disease Info' : 'Health')}
                                        </span>
                                    </div>

                                    {/* Right Side: Content */}
                                    <div className="fav-content">
                                        <h3>{item.title}</h3>
                                        <p className="fav-type-label">
                                            {item.type === 'disease' ? 'Infectious Diseases & Prevention' : 'General Health Knowledge'}
                                        </p>
                                        <span className="fav-read-more">Read Article →</span>
                                    </div>
                                </article>
                            </Link>

                            {/* Floating Button */}
                            <div className="floating-fav-btn">
                                <FavoriteButton
                                    articleId={item.articleId}
                                    title={item.title}
                                    type={item.type}
                                    imageUrl={item.imageUrl}
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