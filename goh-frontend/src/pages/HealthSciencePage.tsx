// src/pages/HealthSciencePage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FavoriteButton } from '../components/FavoriteButton';
import { localArticles } from '../data/localContent';
import './HealthSciencePage.css';

interface Article {
    id: string;
    title: string;
    category: string;
    readTime: string;
    imageUrl?: string;
    summary: string;
    publishDate: string;
}

export default function HealthSciencePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const categories = ['All', 'General Health', 'Disease Prevention', 'Mental Health', 'Nutrition'];

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'articles'));
                const articlesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Article[];
                setArticles(articlesData);
            } catch (error) {
                console.error("Error fetching articles:", error);
                setArticles(localArticles);
            } finally {
                setIsLoading(false);
            }
        };
        fetchArticles();
    }, []);

    const filteredArticles = articles.filter((article) => {
        const titleMatch = (article.title?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const summaryMatch = (article.summary?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const categoryMatch = selectedCategory === 'All' || article.category === selectedCategory;
        return (titleMatch || summaryMatch) && categoryMatch;
    });

    return (
        <div className="science-page">
            <header className="science-header">
                <h1 className="science-title">Health Knowledge Central</h1>
                <p className="science-subtitle">Expert-reviewed articles from our cloud database.</p>

                <div className="science-controls">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="category-filters">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="science-content">
                {isLoading ? (
                    <div style={{textAlign: 'center', padding: '60px', color: '#666', fontSize: '18px'}}>
                        🔄 Loading articles...
                    </div>
                ) : (
                    <div className="articles-grid">
                        {filteredArticles.length > 0 ? filteredArticles.map((article) => (
                            // 🟢 Layout Structure: Wrapper -> Link(Card) -> FloatButton
                            <div key={article.id} className="article-card-wrapper">
                                <Link to={`/health/${article.id}`} className="article-card-link">
                                    <article className="science-article-card">
                                        {/* Left Side: Image */}
                                        <div className="article-image-wrapper">
                                            <img
                                                src={article.imageUrl || 'https://via.placeholder.com/400x250?text=Health+Article'}
                                                alt={article.title}
                                            />
                                            <span className="article-category-badge">{article.category}</span>
                                        </div>

                                        {/* Right Side: Content */}
                                        <div className="article-content">
                                            <div className="article-meta">
                                                <span>{article.publishDate || '2025-12-30'}</span>
                                                <span className="dot">•</span>
                                                <span>{article.readTime || '5 min read'}</span>
                                            </div>
                                            <h3>{article.title}</h3>
                                            <p>{article.summary}</p>
                                            <span className="read-more-text">Read Article →</span>
                                        </div>
                                    </article>
                                </Link>

                                {/* Floating Favorite Button (Outside the Link) */}
                                <div className="floating-fav-btn">
                                    <FavoriteButton
                                        articleId={article.id}
                                        title={article.title}
                                        type="health"
                                        imageUrl={article.imageUrl}
                                        category={article.category}
                                    />
                                </div>
                            </div>
                        )) : (
                            <div className="no-results">
                                <p>No articles found.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
