// src/pages/HomePage.tsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import "./HomePage.css";
// Ensure assets exist
import dataVisImage from "../assets/data-vis.png";
import handHeartVideo from "../assets/hand_heart.mp4";

interface Article {
    id?: string;
    title: string;
    summary?: string;
    imageUrl?: string;
    category?: string;
    publishDate?: string;
}

const HomePage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const knowledgeScrollRef = useRef<HTMLDivElement>(null);
    const diseaseScrollRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");

    // 🟢 Separated data states for the two sections
    const [knowledgeArticles, setKnowledgeArticles] = useState<Article[]>([]);
    const [diseaseArticles, setDiseaseArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8;
        }
    }, []);

    // 🟢 Fetch data from database (Separated requests)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Fetch Health Knowledge (from 'articles' collection)
                // Order by publish date descending, limit to top 10
                const knowledgeQuery = query(
                    collection(db, "articles"),
                    orderBy("publishDate", "desc"),
                    limit(10)
                );
                const knowledgeSnap = await getDocs(knowledgeQuery);
                const kData = knowledgeSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Article[];
                setKnowledgeArticles(kData);

                // 2. Fetch Disease Information (from 'Disease_Information' collection)
                const diseaseQuery = query(
                    collection(db, "Disease_Information"), // 🟢 Corresponds to your new collection name
                    orderBy("publishDate", "desc"),
                    limit(10)
                );
                const diseaseSnap = await getDocs(diseaseQuery);
                const dData = diseaseSnap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Article[];
                setDiseaseArticles(dData);

            } catch (error) {
                console.error("Error fetching home data:", error);
            } finally {
                setLoading(false);
            }
        };

        void fetchData();
    }, []);

    // --- Interaction Logic ---
    const handleReadMore = (id: string, type: 'article' | 'disease') => {
        if (type === 'disease') {
            navigate(`/disease/${id}`); // Assumes disease detail route is /disease/:id
        } else {
            navigate(`/article/${id}`);
        }
    };

    const handleViewAll = (section: 'knowledge' | 'disease') => {
        if (section === 'knowledge') {
            navigate('/science'); // Navigates to HealthKnowledgePage
        } else {
            navigate('/diseases'); // Navigates to DiseaseInfoPage
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate('/ai-assistant', { state: { initialQuery: searchQuery } });
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    // Scroll control function
    const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
        if (ref.current) {
            const { current } = ref;
            const scrollAmount = 900;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Render individual card component
    const renderCard = (card: Article, type: 'article' | 'disease') => (
        <article
            key={card.id}
            className="article-card"
            onClick={() => card.id && handleReadMore(card.id, type)}
        >
            <div className="card-image-wrapper">
                {card.imageUrl ? (
                    <img src={card.imageUrl} alt={card.title} />
                ) : (
                    <div className="card-image-placeholder" />
                )}
            </div>

            <div className="card-body">
                <div className="card-content-top">
                    <div className="card-tags">
                        {/* Only Knowledge section usually has categories; Disease displays a fixed tag */}
                        <span className="tag-category">
                            {type === 'article' ? (card.category || "General") : "Disease Info"}
                        </span>
                    </div>
                    <h3>{card.title}</h3>
                    <p className="card-summary">
                        {card.summary || "No description available."}
                    </p>
                </div>

                <div className="card-footer">
                    <span className="read-more-text">Read more →</span>
                </div>
            </div>
        </article>
    );

    return (
        <main className="home-page">
            <div className="home-scroll">

                {/* 1. Hero Section */}
                <section className="home-section hero">
                    <video ref={videoRef} className="hero-video" src={handHeartVideo} autoPlay loop muted playsInline />
                    <div className="hero-overlay" />
                    <div className="hero-content">
                        <h1>Your health, We care</h1>
                        <p>Your first step to safe and informed care</p>

                        <div className="hero-search">
                            <input
                                type="text"
                                placeholder="Ask a health question to get started..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            <button onClick={handleSearch}>↑</button>
                        </div>
                    </div>
                </section>

                {/* 2. Content Sections */}
                <section className="home-section articles">
                    <div className="articles-inner">

                        {/* --- First Row: Health Knowledge Central --- */}
                        <div className="articles-block">
                            <div className="articles-header">
                                {/* 🟢 Updated Title */}
                                <h2>Health Knowledge Central</h2>
                                <button className="view-all-btn" onClick={() => handleViewAll('knowledge')}>View all</button>
                            </div>

                            <div className="carousel-wrapper">
                                <button className="nav-arrow left-arrow" onClick={() => scroll(knowledgeScrollRef, 'left')}>‹</button>

                                <div className="card-carousel" ref={knowledgeScrollRef}>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : knowledgeArticles.length > 0 ? (
                                        knowledgeArticles.map(item => renderCard(item, 'article'))
                                    ) : (
                                        <p className="no-data">No articles found.</p>
                                    )}
                                </div>

                                <button className="nav-arrow right-arrow" onClick={() => scroll(knowledgeScrollRef, 'right')}>›</button>
                            </div>
                        </div>

                        {/* --- Second Row: Disease Information --- */}
                        <div className="articles-block">
                            <div className="articles-header">
                                <h2>Disease Information</h2>
                                <button className="view-all-btn" onClick={() => handleViewAll('disease')}>View all</button>
                            </div>

                            <div className="carousel-wrapper">
                                <button className="nav-arrow left-arrow" onClick={() => scroll(diseaseScrollRef, 'left')}>‹</button>

                                <div className="card-carousel" ref={diseaseScrollRef}>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : diseaseArticles.length > 0 ? (
                                        diseaseArticles.map(item => renderCard(item, 'disease'))
                                    ) : (
                                        <p className="no-data">No disease info found.</p>
                                    )}
                                </div>

                                <button className="nav-arrow right-arrow" onClick={() => scroll(diseaseScrollRef, 'right')}>›</button>
                            </div>
                        </div>

                    </div>
                </section>

                {/* 3. Data Visualization */}
                <section className="home-section dataviz">
                    <div className="dataviz-inner">
                        <div className="dataviz-image-wrap">
                            <img src={dataVisImage} alt="Health data visualisation" />
                        </div>
                        <div className="dataviz-text">
                            <h2>Health Data Visualization</h2>
                            <p>
                                Good information leads to better health decisions. Explore
                                global health indicators such as infectious disease trends and
                                vaccination coverage through clear, easy-to-understand charts.
                            </p>
                            <button
                                className="dataviz-button"
                                onClick={() => navigate('/data-viz')}
                            >
                                Explore data
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default HomePage;