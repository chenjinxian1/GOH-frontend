// src/pages/DiseaseSearchPage.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
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
    // 1. 定义状态
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All'); // 默认选中 'All'
    const [diseases, setDiseases] = useState<DiseaseItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // 2. 定义分类列表 (根据你的截图 image_a23c61.png)
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

    // 3. 升级筛选逻辑：同时匹配“搜索词”和“分类”
    const filteredDiseases = diseases.filter(d => {
        // 搜索匹配 (标题 或 摘要)
        const matchesSearch = (d.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (d.summary?.toLowerCase() || '').includes(searchTerm.toLowerCase());

        // 分类匹配 (如果是 'All' 则匹配所有，否则必须精确匹配 category 字段)
        const matchesCategory = selectedCategory === 'All' || d.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div className="science-page">
            <header className="science-header">
                <h1 className="science-title">Disease Information</h1>
                <p className="science-subtitle">Comprehensive guide to infectious diseases, prevention, and treatment.</p>

                <div className="science-controls">
                    {/* 搜索框 */}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder="Search diseases (e.g. Dengue, TB)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* 🟢 新增：分类筛选按钮组 (完全复刻 Health Knowledge 样式) */}
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
                            <Link to={`/disease/${item.id}`} key={item.id} className="article-card-link">
                                <article className="science-article-card">
                                    <div className="article-image-wrapper">
                                        <img
                                            src={item.imageUrl || 'https://via.placeholder.com/400x250?text=Disease+Info'}
                                            alt={item.title}
                                        />
                                        {/* 显示分类徽章 */}
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
                            </Link>
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