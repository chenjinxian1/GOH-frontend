// src/pages/ArticleDetailPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ReactMarkdown from 'react-markdown';

// 🟢 关键：直接复用之前创建的通用 CSS，保证两个板块详情页长得一样
import './ArticleDetailPage.css';

export default function ArticleDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) return;
            try {
                // 🟢 区别点：这里读取 'articles' 集合
                const docRef = doc(db, 'articles', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setArticle(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching article:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

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
            {/* 1. 返回按钮 */}
            <button className="back-btn" onClick={() => navigate(-1)}>
                ← Back to Health Science
            </button>

            <article>
                {/* 2. 头部信息：标签、标题、元数据 */}
                <header className="article-header">
                    <span className="article-category-tag">
                        {article.category || "General Health"}
                    </span>

                    <h1 className="article-title">{article.title}</h1>

                    <div className="article-meta">
                        {/* 日历图标 */}
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>
                        <span>{article.publishDate || "2025-01-01"}</span>

                        <span style={{margin:'0 8px'}}>•</span>

                        {/* 时钟图标 */}
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
                        <span>{article.readTime || "5 min read"}</span>
                    </div>
                </header>

                {/* 3. 大图 Hero Image */}
                {article.imageUrl && (
                    <figure className="article-hero-image">
                        <img src={article.imageUrl} alt={article.title} />
                    </figure>
                )}

                {/* 4. 正文内容 (支持 Markdown) */}
                <div className="article-content">
                    <ReactMarkdown>{article.content}</ReactMarkdown>
                </div>
            </article>
        </div>
    );
}