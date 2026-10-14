import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./HomePage.css";
import { useHomeLanguage } from "../context/HomeLanguageContext";
import { homeCopy, type CategoryKey } from "../i18n/homeCopy";

const categories: CategoryKey[] = ["Prevention", "Nutrition", "Mental Health", "Chronic Conditions", "Infectious Diseases", "Lifestyle"];

function ToolMockup({ variant }: { variant: string }) {
    return (
        <div className={`tool-mockup tool-mockup-${variant}`} aria-hidden="true">
            <div className="mockup-topline" />
            <div className="mockup-body">
                <span />
                <span />
                <span />
            </div>
            <div className="mockup-accent" />
        </div>
    );
}

export default function HomePage() {
    const navigate = useNavigate();
    const { language } = useHomeLanguage();
    const copy = homeCopy[language];
    const { toolCards, categoryRecommendations, dashboardStatuses, recentTopics } = copy;
    const { currentUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("Prevention");

    useEffect(() => {
        const timer = window.setTimeout(() => setIsLoading(false), 620);
        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.16, rootMargin: "0px 0px -40px 0px" }
        );

        revealItems.forEach((item) => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    const profilePath = currentUser ? "/profile" : "/login";

    return (
        <main className="home-page saas-home">
            {isLoading && (
                <div className="home-loader" aria-label={copy.loadingLabel}>
                    <div className="loader-mark" />
                    <span>{copy.loading}</span>
                </div>
            )}

            <section className="home-hero" aria-labelledby="home-hero-title">
                <div className="home-background-grid" aria-hidden="true" />
                <div className="home-glow home-glow-a" aria-hidden="true" />
                <div className="home-glow home-glow-b" aria-hidden="true" />
                <svg className="home-pulse-line" viewBox="0 0 900 220" aria-hidden="true">
                    <path d="M10 118 H130 L162 72 L205 156 L245 118 H372 L398 92 L426 136 L456 118 H620 L650 78 L694 152 L730 118 H890" />
                </svg>

                <div className="home-container hero-grid">
                    <header className="hero-copy">
                        <div className="eyebrow hero-reveal hero-reveal-1">
                            <span className="eyebrow-dot" />{copy.eyebrow}</div>
                        <h1 id="home-hero-title" className="hero-reveal hero-reveal-2">{copy.titleStart}<span>{copy.titleHighlight}</span>{copy.titleEnd}</h1>
                        <p className="hero-reveal hero-reveal-3">{copy.intro}</p>

                        <div className="hero-actions hero-reveal hero-reveal-4" aria-label={copy.primaryActions}>
                            <Link className="btn btn-primary" to="/ai-assistant">{copy.askAssistant}<span className="btn-arrow">→</span>
                            </Link>
                            <Link className="btn btn-secondary" to="/diseases">{copy.exploreDiseases}<span className="btn-arrow">→</span>
                            </Link>
                        </div>

                        <dl className="hero-metrics hero-reveal hero-reveal-5" aria-label={copy.platformOverview}>
                            <div>
                                <dt>4</dt>
                                <dd>{copy.coreTools}</dd>
                            </div>
                            <div>
                                <dt>24/7</dt>
                                <dd>{copy.educationalAccess}</dd>
                            </div>
                            <div>
                                <dt>100%</dt>
                                <dd>{copy.mockData}</dd>
                            </div>
                        </dl>
                    </header>

                    <aside className="dashboard-shell" aria-label={copy.dashboardLabel}>
                        <div className="dashboard-live-badge">
                            <span />{copy.livePreview}</div>

                        <div className="dashboard-topbar">
                            <div>
                                <span className="dashboard-title">{copy.platformTitle}</span>
                                <span className="dashboard-subtitle">{copy.workspace}</span>
                            </div>
                            <div className="status-stack">
                                {dashboardStatuses.map((status) => (
                                    <span key={status}><i /> {status}</span>
                                ))}
                            </div>
                        </div>

                        <div className="dashboard-main">
                            <Link className="insight-panel dashboard-tile" to="/data-viz" data-tip={copy.insightTip}>
                                <div className="panel-heading">
                                    <span>{copy.dailyInsight}</span>
                                    <strong>{copy.learningActivity}</strong>
                                </div>
                                <div className="chart-card" aria-label={copy.chartLabel}>
                                    <svg viewBox="0 0 360 160" role="img" aria-label={copy.chartTrendLabel}>
                                        <defs>
                                            <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#5DEBFF" stopOpacity="0.32" />
                                                <stop offset="100%" stopColor="#5DEBFF" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path className="chart-area" d="M16 130 C64 96 88 120 128 80 C170 38 198 92 236 58 C282 20 304 64 344 36 V144 H16 Z" />
                                        <path className="chart-line" d="M16 130 C64 96 88 120 128 80 C170 38 198 92 236 58 C282 20 304 64 344 36" />
                                        <g className="chart-bars">
                                            <rect x="36" y="96" width="16" height="44" rx="8" />
                                            <rect x="78" y="78" width="16" height="62" rx="8" />
                                            <rect x="120" y="102" width="16" height="38" rx="8" />
                                            <rect x="162" y="64" width="16" height="76" rx="8" />
                                            <rect x="204" y="88" width="16" height="52" rx="8" />
                                            <rect x="246" y="48" width="16" height="92" rx="8" />
                                            <rect x="288" y="70" width="16" height="70" rx="8" />
                                        </g>
                                    </svg>
                                </div>
                            </Link>

                            <Link className="assistant-panel dashboard-tile" to="/ai-assistant" data-tip={copy.assistantTip}>
                                <div className="assistant-orb">AI</div>
                                <div>
                                    <span>{copy.assistantStatus}</span>
                                    <strong>{copy.assistantOnline}</strong>
                                    <p>{copy.educationalOnly}</p>
                                </div>
                            </Link>

                            <button className="shortcut-panel dashboard-tile" type="button" onClick={() => navigate("/diseases")} data-tip={copy.diseaseTip}>
                                <span>{copy.diseaseSearch}</span>
                                <strong>{copy.browseTopics}</strong>
                            </button>

                            <Link className="wellness-panel dashboard-tile" to={profilePath} data-tip={copy.accountTip}>
                                <div className="panel-heading">
                                    <span>{copy.personalHub}</span>
                                    <strong>{copy.learningOverview}</strong>
                                </div>
                                <div className="progress-row">
                                    <span>{copy.learningProgress}</span>
                                    <strong>72%</strong>
                                </div>
                                <div className="progress-track"><span style={{ width: "72%" }} /></div>
                                <div className="mini-stats">
                                    <div><strong>18</strong><span>{copy.savedTopics}</span></div>
                                    <div><strong>9</strong><span>{copy.dataViews}</span></div>
                                </div>
                            </Link>

                            <Link className="topics-panel dashboard-tile" to="/science" data-tip={copy.readingTip}>
                                <div className="panel-heading">
                                    <span>{copy.recentTopicsTitle}</span>
                                    <strong>{copy.continueLearning}</strong>
                                </div>
                                <ul>
                                    {recentTopics.map((topic) => (
                                        <li key={topic}>
                                            <span className="topic-dot" />
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                            </Link>
                        </div>
                    </aside>
                </div>
            </section>

            <section className="story-section problem-section" aria-labelledby="problem-title" data-reveal>
                <div className="home-container two-column">
                    <div className="section-kicker">{copy.problemKicker}</div>
                    <div>
                        <h2 id="problem-title">{copy.problemTitle}</h2>
                        <p>{copy.problemDescription}</p>
                    </div>
                </div>
            </section>

            <section className="story-section value-section" aria-labelledby="value-title" data-reveal>
                <div className="home-container platform-card">
                    <div>
                        <div className="section-kicker">{copy.valueKicker}</div>
                        <h2 id="value-title">{copy.valueTitle}</h2>
                    </div>
                    <p>{copy.valueDescription}</p>
                </div>
            </section>

            <section className="story-section features-section" aria-labelledby="features-title">
                <div className="home-container">
                    <div className="section-heading" data-reveal>
                        <div className="section-kicker">{copy.hubKicker}</div>
                        <h2 id="features-title">{copy.hubTitle}</h2>
                    </div>
                    <div className="feature-grid">
                        {([] as Array<{ title: string; description: string; label: string; to: string; mockup: string }>).map((feature, index) => (
                            <Link
                                className="feature-card clickable-card"
                                key={feature.title}
                                to={feature.to}
                                style={{ transitionDelay: `${index * 40}ms` }}
                                data-reveal
                            >
                                <div className="feature-icon" aria-hidden="true">
                                    <span />
                                </div>
                                <ToolMockup variant={feature.mockup} />
                                <span className="feature-label">{feature.label}</span>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                                <span className="card-arrow">→</span>
                            </Link>
                        ))}
                        <Link
                            className="feature-card clickable-card profile-feature"
                            to={profilePath}
                            data-reveal
                        >
                            <div className="feature-icon" aria-hidden="true">
                                <span />
                            </div>
                            <ToolMockup variant="profile" />
                            <span className="feature-label">{copy.openHub}</span>
                            <h3>{copy.personalHub}</h3>
                            <p>{copy.hubDescription}</p>
                            <span className="card-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="story-section tools-section" aria-labelledby="tools-title">
                <div className="home-container">
                    <div className="section-heading" data-reveal>
                        <div className="section-kicker">{copy.toolsKicker}</div>
                        <h2 id="tools-title">{copy.toolsTitle}</h2>
                    </div>
                    <div className="quick-access-grid">
                        {toolCards.map((tool, index) => (
                            <Link
                                className="tool-card clickable-card"
                                key={tool.title}
                                to={tool.to}
                                style={{ transitionDelay: `${index * 45}ms` }}
                                data-reveal
                            >
                                <div>
                                    <span className="tool-status"><i />{copy.ready}</span>
                                    <h3>{tool.title}</h3>
                                    <p>{tool.description}</p>
                                </div>
                                <ToolMockup variant={tool.variant} />
                                <span className="tool-action">{tool.action} <span>→</span></span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="story-section category-section" aria-labelledby="category-title">
                <div className="home-container category-shell" data-reveal>
                    <div className="category-copy">
                        <div className="section-kicker">{copy.categoriesKicker}</div>
                        <h2 id="category-title">{copy.categoriesTitle}</h2>
                        <p>{copy.categoriesDescription}</p>
                    </div>

                    <div className="category-content">
                        <div className="category-chips" role="tablist" aria-label={copy.categoriesLabel}>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className={`category-chip ${selectedCategory === category ? "active" : ""}`}
                                    onClick={() => setSelectedCategory(category)}
                                    role="tab"
                                    aria-selected={selectedCategory === category}
                                >
                                    {copy.categoryLabels[category]}
                                </button>
                            ))}
                        </div>

                        <div className="category-recommendations">
                            {categoryRecommendations[selectedCategory].map((item) => (
                                <Link className="recommendation-card clickable-card" to={item.to} key={item.title}>
                                    <span className="recommendation-dot" />
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.detail}</p>
                                    </div>
                                    <span className="card-arrow">→</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="story-section assistant-preview-section" aria-labelledby="assistant-preview-title" data-reveal>
                <div className="home-container assistant-preview-grid">
                    <div>
                        <div className="section-kicker">{copy.disclaimerKicker}</div>
                        <h2 id="assistant-preview-title">{copy.disclaimerTitle}</h2>
                        <p>{copy.disclaimerDescription}</p>
                    </div>
                    <div className="chat-mockup" aria-label={copy.chatLabel}>
                        <div className="chat-header">
                            <span className="chat-status" />{copy.chatTitle}</div>
                        <div className="chat-bubble user">{copy.chatQuestion}</div>
                        <div className="chat-bubble ai">{copy.chatAnswer}</div>
                        <p className="disclaimer">{copy.medicalDisclaimer}</p>
                    </div>
                </div>
            </section>

            <section className="story-section preview-section" aria-labelledby="preview-title">
                <div className="home-container">
                    <div className="section-heading" data-reveal>
                        <div className="section-kicker">{copy.libraryKicker}</div>
                        <h2 id="preview-title">{copy.libraryTitle}</h2>
                    </div>
                    <div className="preview-grid">
                        <Link className="preview-card clickable-card" to="/diseases" data-reveal>
                            <span>{copy.diseaseEncyclopedia}</span>
                            <h3>{copy.diseaseDescription}</h3>
                            <div className="tag-list">
                                <span>{copy.categoryLabels["Infectious Diseases"]}</span>
                                <span>{copy.categoryLabels["Chronic Conditions"]}</span>
                                <span>{copy.categoryLabels["Prevention"]}</span>
                            </div>
                            <strong>{copy.exploreDiseases}<span>→</span></strong>
                        </Link>
                        <Link className="preview-card clickable-card" to="/science" data-reveal>
                            <span>{copy.healthCentral}</span>
                            <h3>{copy.healthDescription}</h3>
                            <div className="tag-list">
                                <span>{copy.categoryLabels["Mental Health"]}</span>
                                <span>{copy.categoryLabels["Nutrition"]}</span>
                                <span>{copy.categoryLabels["Lifestyle"]}</span>
                            </div>
                            <strong>{copy.browseKnowledge}<span>→</span></strong>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="final-cta-section" aria-labelledby="final-cta-title" data-reveal>
                <div className="home-container final-cta-card">
                    <h2 id="final-cta-title">{copy.finalTitle}</h2>
                    <p>{copy.finalDescription}</p>
                    <div className="hero-actions">
                        <Link className="btn btn-primary" to="/ai-assistant">{copy.startAssistant}<span className="btn-arrow">→</span>
                        </Link>
                        <Link className="btn btn-secondary" to="/diseases">{copy.browseDiseaseLibrary}<span className="btn-arrow">→</span>
                        </Link>
                        <Link className="btn btn-secondary" to="/science">{copy.exploreArticles}<span className="btn-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
