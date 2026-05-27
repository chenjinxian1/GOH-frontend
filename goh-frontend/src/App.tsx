// src/App.tsx
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import AIAssistantPage from './pages/AIAssistantPage';
import HealthSciencePage from './pages/HealthSciencePage';
import DiseaseSearchPage from './pages/DiseaseSearchPage';
// import DiseaseDetailPage from './pages/DiseaseDetailPage'; // ❌ Remove or comment this out, this component was incorrect
import DataVizPage from './pages/DataVizPage';
import FeedbackPage from './pages/FeedbackPage';
import ArticleDetailPage from './pages/ArticleDetailPage'; // ✅ Ensure this universal detail page is imported
import NotFoundPage from './pages/NotFoundPage';
import CreateArticlePage from './pages/CreateArticlePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import MyFavoritesPage from './pages/MyFavoritesPage';
import PrivacyPage from './pages/PrivacyPage';
import LegalPage from './pages/LegalPage';

function App() {
    const { pathname } = useLocation();

    // Automatically scroll to top when route changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ai-assistant" element={<AIAssistantPage />} />

                    {/* --- Universal Article Route --- */}
                    <Route path="/article/:id" element={<ArticleDetailPage />} />

                    {/* --- Health Science --- */}
                    <Route path="/science" element={<HealthSciencePage />} />
                    <Route path="/articles" element={<HealthSciencePage />} />

                    {/* Support detail links starting with /health/ or /science/ */}
                    <Route path="/health/:id" element={<ArticleDetailPage />} />
                    <Route path="/science/:id" element={<ArticleDetailPage />} />

                    {/* --- Disease Info --- */}
                    <Route path="/diseases" element={<DiseaseSearchPage />} />

                    {/* 🔴 Core Fix: Redirect Disease details to ArticleDetailPage */}
                    {/* Previously pointed to DiseaseDetailPage (which was a duplicate of the list page, causing infinite refresh) */}
                    <Route path="/disease/:id" element={<ArticleDetailPage />} />

                    {/* --- User Features --- */}
                    <Route path="/data-viz" element={<DataVizPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />
                    <Route path="/favorites" element={<MyFavoritesPage />} />

                    {/* --- Auth & Profile --- */}
                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/register" element={<AuthPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/create" element={<CreateArticlePage />} />

                    {/* --- Legal --- */}
                    <Route path="/privacy-policy" element={<PrivacyPage />} />
                    <Route path="/legal-notice" element={<LegalPage />} />

                    {/* 404 Not Found */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;
