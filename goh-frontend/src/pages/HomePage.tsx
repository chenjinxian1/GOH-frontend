import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./HomePage.css";

type CategoryKey =
    | "Prevention"
    | "Nutrition"
    | "Mental Health"
    | "Chronic Conditions"
    | "Infectious Diseases"
    | "Lifestyle";

const toolCards = [
    {
        title: "Ask AI Assistant",
        description: "Get general health guidance in a conversational way.",
        action: "Try now",
        to: "/ai-assistant",
        variant: "chat",
    },
    {
        title: "Search Diseases",
        description: "Understand signs, categories, and essential disease information.",
        action: "Explore",
        to: "/diseases",
        variant: "search",
    },
    {
        title: "Read Health Science",
        description: "Explore curated health knowledge and wellness topics.",
        action: "Open library",
        to: "/science",
        variant: "article",
    },
    {
        title: "View Health Data",
        description: "Turn health information into clear visual insights.",
        action: "View insights",
        to: "/data-viz",
        variant: "chart",
    },
];

const categories: CategoryKey[] = [
    "Prevention",
    "Nutrition",
    "Mental Health",
    "Chronic Conditions",
    "Infectious Diseases",
    "Lifestyle",
];

const categoryRecommendations: Record<CategoryKey, Array<{ title: string; detail: string; to: string }>> = {
    Prevention: [
        { title: "Hand hygiene basics", detail: "Build everyday habits that reduce infection spread.", to: "/science" },
        { title: "Vaccination awareness", detail: "Learn how preventive care supports public health.", to: "/science" },
        { title: "Dengue prevention", detail: "Understand mosquito control and personal protection steps.", to: "/diseases" },
    ],
    Nutrition: [
        { title: "Balanced plate guide", detail: "Create simple meals with fiber, protein, and color.", to: "/science" },
        { title: "Hydration habits", detail: "Learn practical cues for daily water intake.", to: "/science" },
    ],
    "Mental Health": [
        { title: "Stress body signals", detail: "Notice how stress can affect sleep, focus, and energy.", to: "/science" },
        { title: "Sleep routine reset", detail: "Build a calmer evening routine for better rest.", to: "/science" },
    ],
    "Chronic Conditions": [
        { title: "Blood pressure awareness", detail: "Understand what repeated readings can tell you.", to: "/diseases" },
        { title: "Type 2 diabetes learning", detail: "Review blood sugar basics and follow-up awareness.", to: "/diseases" },
    ],
    "Infectious Diseases": [
        { title: "Influenza overview", detail: "Learn how seasonal respiratory infections spread.", to: "/diseases" },
        { title: "Measles awareness", detail: "Review key facts and prevention-focused learning.", to: "/diseases" },
    ],
    Lifestyle: [
        { title: "Daily movement", detail: "Use short activity breaks to support long-term wellbeing.", to: "/science" },
        { title: "Healthy routines", detail: "Connect sleep, movement, food, and stress awareness.", to: "/science" },
    ],
};

const dashboardStatuses = [
    "AI Assistant: Online",
    "Articles: Updated",
    "Disease Library: Available",
    "Visualization: Ready",
];

const recentTopics = [
    "Sleep quality",
    "Nutrition basics",
    "Dengue prevention",
    "Blood pressure awareness",
];

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
                <div className="home-loader" aria-label="Loading homepage">
                    <div className="loader-mark" />
                    <span>LOADING</span>
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
                            <span className="eyebrow-dot" />
                            Healthcare education platform
                        </div>
                        <h1 id="home-hero-title" className="hero-reveal hero-reveal-2">
                            Making <span>Health Knowledge</span> More Accessible
                        </h1>
                        <p className="hero-reveal hero-reveal-3">
                            Explore reliable health information, understand diseases, ask
                            AI-powered questions, and visualize health insights in one modern
                            platform.
                        </p>

                        <div className="hero-actions hero-reveal hero-reveal-4" aria-label="Primary homepage actions">
                            <Link className="btn btn-primary" to="/ai-assistant">
                                Ask AI Assistant <span className="btn-arrow">→</span>
                            </Link>
                            <Link className="btn btn-secondary" to="/diseases">
                                Explore Diseases <span className="btn-arrow">→</span>
                            </Link>
                        </div>

                        <dl className="hero-metrics hero-reveal hero-reveal-5" aria-label="Platform overview">
                            <div>
                                <dt>4</dt>
                                <dd>Core learning tools</dd>
                            </div>
                            <div>
                                <dt>24/7</dt>
                                <dd>Educational access</dd>
                            </div>
                            <div>
                                <dt>100%</dt>
                                <dd>Mock dashboard data</dd>
                            </div>
                        </dl>
                    </header>

                    <aside className="dashboard-shell" aria-label="Health platform dashboard mockup">
                        <div className="dashboard-live-badge">
                            <span /> Live Preview
                        </div>

                        <div className="dashboard-topbar">
                            <div>
                                <span className="dashboard-title">GOH Platform</span>
                                <span className="dashboard-subtitle">Education workspace</span>
                            </div>
                            <div className="status-stack">
                                {dashboardStatuses.map((status) => (
                                    <span key={status}><i /> {status}</span>
                                ))}
                            </div>
                        </div>

                        <div className="dashboard-main">
                            <Link className="insight-panel dashboard-tile" to="/data-viz" data-tip="Open visual learning tools">
                                <div className="panel-heading">
                                    <span>Daily Insight</span>
                                    <strong>Learning activity</strong>
                                </div>
                                <div className="chart-card" aria-label="Mock insight chart">
                                    <svg viewBox="0 0 360 160" role="img" aria-label="Mock learning trend chart">
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

                            <Link className="assistant-panel dashboard-tile" to="/ai-assistant" data-tip="Ask a general health question">
                                <div className="assistant-orb">AI</div>
                                <div>
                                    <span>AI Assistant Status</span>
                                    <strong>Online for general questions</strong>
                                    <p>Educational support only</p>
                                </div>
                            </Link>

                            <button className="shortcut-panel dashboard-tile" type="button" onClick={() => navigate("/diseases")} data-tip="Browse disease topics">
                                <span>Disease Search</span>
                                <strong>Browse educational topics</strong>
                            </button>

                            <Link className="wellness-panel dashboard-tile" to={profilePath} data-tip="Open your account hub">
                                <div className="panel-heading">
                                    <span>Personal Health Hub</span>
                                    <strong>Learning overview</strong>
                                </div>
                                <div className="progress-row">
                                    <span>Learning Progress</span>
                                    <strong>72%</strong>
                                </div>
                                <div className="progress-track"><span style={{ width: "72%" }} /></div>
                                <div className="mini-stats">
                                    <div><strong>18</strong><span>Saved Topics</span></div>
                                    <div><strong>9</strong><span>Data Views</span></div>
                                </div>
                            </Link>

                            <Link className="topics-panel dashboard-tile" to="/science" data-tip="Continue reading">
                                <div className="panel-heading">
                                    <span>Recent Topics</span>
                                    <strong>Continue learning</strong>
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
                    <div className="section-kicker">Problem</div>
                    <div>
                        <h2 id="problem-title">Health information is everywhere, but understanding it is hard.</h2>
                        <p>
                            People often move between articles, search results, charts, and
                            disconnected advice. Guardians of Health brings the learning path
                            into a calmer, more structured experience.
                        </p>
                    </div>
                </div>
            </section>

            <section className="story-section value-section" aria-labelledby="value-title" data-reveal>
                <div className="home-container platform-card">
                    <div>
                        <div className="section-kicker">Platform Value</div>
                        <h2 id="value-title">One modern place for everyday health learning.</h2>
                    </div>
                    <p>
                        Learn health topics, explore disease information, ask general questions,
                        and understand health trends without switching contexts.
                    </p>
                </div>
            </section>

            <section className="story-section features-section" aria-labelledby="features-title">
                <div className="home-container">
                    <div className="section-heading" data-reveal>
                        <div className="section-kicker" />
                        <h2 id="features-title" />
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
                            <span className="feature-label">Open hub</span>
                            <h3>Personal Health Hub</h3>
                            <p>Manage your account, saved topics, and learning activity.</p>
                            <span className="card-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="story-section tools-section" aria-labelledby="tools-title">
                <div className="home-container">
                    <div className="section-heading" data-reveal>
                        <div className="section-kicker">Featured Health Tools</div>
                        <h2 id="tools-title">Explore your health tools</h2>
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
                                    <span className="tool-status"><i /> Ready</span>
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
                        <div className="section-kicker">Explore by Category</div>
                        <h2 id="category-title">Choose a health topic and keep learning.</h2>
                        <p>
                            Switch between themes to see recommended learning paths. These are
                            mock recommendations designed for navigation and education.
                        </p>
                    </div>

                    <div className="category-content">
                        <div className="category-chips" role="tablist" aria-label="Health categories">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className={`category-chip ${selectedCategory === category ? "active" : ""}`}
                                    onClick={() => setSelectedCategory(category)}
                                    role="tab"
                                    aria-selected={selectedCategory === category}
                                >
                                    {category}
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
                        <div className="section-kicker">Trust / Disclaimer</div>
                        <h2 id="assistant-preview-title">AI-powered guidance with clear boundaries.</h2>
                        <p>
                            The assistant is designed to organize general health information and
                            support learning. It does not replace professional medical advice.
                        </p>
                    </div>
                    <div className="chat-mockup" aria-label="AI assistant preview">
                        <div className="chat-header">
                            <span className="chat-status" />
                            AI Assistant Preview
                        </div>
                        <div className="chat-bubble user">
                            How can I improve my sleep quality?
                        </div>
                        <div className="chat-bubble ai">
                            Start with a consistent sleep schedule, reduce screen exposure before bedtime,
                            and monitor stress or caffeine intake.
                        </div>
                        <p className="disclaimer">
                            This assistant provides general health information and does not replace
                            professional medical advice.
                        </p>
                    </div>
                </div>
            </section>

            <section className="story-section preview-section" aria-labelledby="preview-title">
                <div className="home-container">
                    <div className="section-heading" data-reveal>
                        <div className="section-kicker">Platform library</div>
                        <h2 id="preview-title">Knowledge and disease topics, organized for clarity.</h2>
                    </div>
                    <div className="preview-grid">
                        <Link className="preview-card clickable-card" to="/diseases" data-reveal>
                            <span>Disease Encyclopedia</span>
                            <h3>Browse condition-focused educational summaries.</h3>
                            <div className="tag-list">
                                <span>Infectious Diseases</span>
                                <span>Chronic Conditions</span>
                                <span>Prevention</span>
                            </div>
                            <strong>Explore Diseases <span>→</span></strong>
                        </Link>
                        <Link className="preview-card clickable-card" to="/science" data-reveal>
                            <span>Health Knowledge Central</span>
                            <h3>Read practical learning materials for daily wellbeing.</h3>
                            <div className="tag-list">
                                <span>Mental Health</span>
                                <span>Nutrition</span>
                                <span>Lifestyle</span>
                            </div>
                            <strong>Browse Health Knowledge <span>→</span></strong>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="final-cta-section" aria-labelledby="final-cta-title" data-reveal>
                <div className="home-container final-cta-card">
                    <h2 id="final-cta-title">Start exploring smarter health knowledge today.</h2>
                    <p>
                        Guardians of Health brings health learning, AI guidance, disease information,
                        and data visualization into one accessible platform.
                    </p>
                    <div className="hero-actions">
                        <Link className="btn btn-primary" to="/ai-assistant">
                            Start with AI Assistant <span className="btn-arrow">→</span>
                        </Link>
                        <Link className="btn btn-secondary" to="/diseases">
                            Browse Disease Library <span className="btn-arrow">→</span>
                        </Link>
                        <Link className="btn btn-secondary" to="/science">
                            Explore Health Articles <span className="btn-arrow">→</span>
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
