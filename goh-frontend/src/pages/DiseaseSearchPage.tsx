// src/pages/DiseaseSearchPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FavoriteButton } from '../components/FavoriteButton';
import './DiseaseSearchPage.css';

interface DiseaseItem {
    id: string;
    title: string;
    summary: string;
    imageUrl?: string;
    readTime?: string;
    category?: string;
    publishDate?: string;
}

export default function DiseaseSearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [diseases, setDiseases] = useState<DiseaseItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const categories = [
        'All',
        'Infectious Diseases',
        'Chronic Conditions',
        'Genetic Disorders',
        'Viral Infections',
        'Other'
    ];

    useEffect(() => {
        const fetchDiseases = async () => {
            try {
                const q = query(collection(db, "Disease_Information"), orderBy("publishDate", "desc"));
                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as DiseaseItem[];
                setDiseases(data);
            } catch (error) {
                console.error("Error fetching diseases:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDiseases();
    }, []);

    const filteredDiseases = diseases.filter(d => {
        const matchesSearch = (d.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (d.summary?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="science-page">
            <header className="science-header">
                <h1 className="science-title">Disease Information</h1>
                <p className="science-subtitle">Comprehensive guide to infectious diseases, prevention, and treatment.</p>

                <div className="science-controls">
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search diseases (e.g. Dengue, TB)..."
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
                        🔄 Loading disease info...
                    </div>
                ) : (
                    <div className="articles-grid">
                        {filteredDiseases.length > 0 ? filteredDiseases.map((item) => (
                            <div key={item.id} className="article-card-wrapper">

                                {/* 1. Card Content (No longer wrapped by Link directly) */}
                                <article className="science-article-card">
                                    <div className="article-image-wrapper">
                                        <img
                                            src={item.imageUrl || 'https://via.placeholder.com/400x250?text=Disease+Info'}
                                            alt={item.title}
                                        />
                                        <span className="article-category-badge">
                                            {item.category || "General"}
                                        </span>
                                    </div>
                                    <div className="article-content">
                                        <div className="article-meta">
                                            <span>{item.publishDate || "Unknown Date"}</span>
                                            <span className="dot">•</span>
                                            <span>{item.readTime || "5 min read"}</span>
                                        </div>
                                        <h3>{item.title}</h3>
                                        <p>{item.summary}</p>
                                        <span className="read-more-text">Learn more →</span>
                                    </div>
                                </article>

                                {/* 🟢 2. Overlay Link (Key to fixing the click issue) */}
                                {/* This Link stretches across the parent container with z-index: 1 */}
                                <Link
                                    to={`/disease/${item.id}`}
                                    className="card-overlay-link"
                                    aria-label={`Read more about ${item.title}`}
                                />

                                {/* 3. Floating Button (z-index: 10, higher than the link to remain clickable) */}
                                <div className="floating-fav-btn">
                                    <FavoriteButton
                                        articleId={item.id}
                                        title={item.title}
                                        type="disease"
                                        imageUrl={item.imageUrl}
                                        category={item.category}
                                    />
                                </div>
                            </div>
                        )) : (
                            <div className="no-results">
                                <p>No diseases found matching "{searchTerm}" in {selectedCategory}.</p>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}