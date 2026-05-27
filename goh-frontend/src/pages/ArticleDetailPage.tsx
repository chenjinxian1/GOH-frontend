// src/pages/ArticleDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ReactMarkdown from 'react-markdown';
import { FavoriteButton } from '../components/FavoriteButton'; // ✅ Import FavoriteButton
import { findLocalContent } from '../data/localContent';
import './ArticleDetailPage.css';

interface ArticleData {
    title: string;
    content: string;
    imageUrl?: string;
    publishDate?: string;
    readTime?: string;
    category?: string;
    keywords?: string[]; // ✅ Added keywords support
}

export default function ArticleDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Used to detect current path
    const [article, setArticle] = useState<ArticleData | null>(null);
    const [loading, setLoading] = useState(true);

    // 🟢 Core Logic: Determine Collection & Type based on URL
    const isDisease = location.pathname.includes('disease');
    const collectionName = isDisease ? 'Disease_Information' : 'articles';
    const typeLabel = isDisease ? 'disease' : 'health';

    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;
            try {
                // 🟢 Dynamic Collection: Fetches from the correct database collection
                const docRef = doc(db, collectionName, id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setArticle(docSnap.data() as ArticleData);
                } else {
                    console.log(`No such document in ${collectionName}!`);
                    setArticle(findLocalContent(collectionName, id));
                }
            } catch (error) {
                console.error("Error fetching article:", error);
                setArticle(findLocalContent(collectionName, id));
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id, collectionName]);

    if (loading) return <div style={{padding:'60px', textAlign:'center', color:'#6b7280'}}>Loading content...</div>;

    if (!article) return (
        <div style={{padding:'60px', textAlign:'center'}}>
            <h2>Article not found</h2>
            <button className="back-btn" onClick={() => navigate(-1)} style={{margin:'20px auto'}}>
                Go Back
            </button>
        </div>
    );

    return (
        <div className="article-detail-page">
            {/* 1. Back Button */}
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <article>
                {/* 2. Header: Flex layout for Title + Favorite Button */}
                <header className="article-header">
                    <span className="article-category-tag">
                        {article.category || "General Health"}
                    </span>

                    <div className="header-flex-row">
                        <h1 className="article-title">{article.title}</h1>
                        <div className="header-fav-wrapper">
                            <FavoriteButton
                                articleId={id!}
                                title={article.title}
                                type={typeLabel}
                                imageUrl={article.imageUrl}
                                category={article.category}
                            />
                        </div>
                    </div>

                    <div className="article-meta">
                        {/* Calendar Icon */}
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>
                        <span>{article.publishDate || "2025-01-01"}</span>

                        <span style={{margin:'0 8px'}}>•</span>

                        {/* Clock Icon */}
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                        <span>{article.readTime || "5 min read"}</span>
                    </div>
                </header>

                {/* 3. Hero Image (Keeps your auto-height setting) */}
                {article.imageUrl && (
                    <figure className="article-hero-image">
                        <img src={article.imageUrl} alt={article.title} />
                    </figure>
                )}

                {/* 4. Main Content */}
                <div className="article-content">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>

                {/* 5. 🟢 Keywords Section with Blue Vertical Line */}
                {article.keywords && article.keywords.length > 0 && (
                    <div className="article-keywords">
                        <span className="keywords-label">
                            Keywords & Topics
                        </span>
                        <div className="keywords-list">
                            {article.keywords.map((keyword, index) => (
                                <span key={index} className="keyword-tag">
                                    #{keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </div>
    );
}
