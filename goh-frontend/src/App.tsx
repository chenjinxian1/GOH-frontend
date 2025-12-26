// src/App.tsx
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import AIAssistantPage from './pages/AIAssistantPage';
import HealthSciencePage from './pages/HealthSciencePage';
import DiseaseSearchPage from './pages/DiseaseSearchPage';
import DiseaseDetailPage from './pages/DiseaseDetailPage';
import DataVizPage from './pages/DataVizPage';
import FeedbackPage from './pages/FeedbackPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import CreateArticlePage from './pages/CreateArticlePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

import PrivacyPage from './pages/PrivacyPage';
import LegalPage from './pages/LegalPage';

function App() {
    const { pathname } = useLocation();

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

                    {/* --- HomePage 跳转适配 --- */}
                    <Route path="/article/:id" element={<ArticleDetailPage />} />
                    <Route path="/articles" element={<HealthSciencePage />} />

                    {/* --- Health Science --- */}
                    <Route path="/science" element={<HealthSciencePage />} />
                    {/* 兼容 /science/:id 跳转 (虽然主要用 /article/:id) */}
                    <Route path="/science/:id" element={<ArticleDetailPage />} />

                    {/* --- Disease Info --- */}
                    <Route path="/diseases" element={<DiseaseSearchPage />} />

                    {/* 🔴 关键修复：这里必须是单数 /disease/:id */}
                    {/* 因为我们在 HomePage 和 DiseaseSearchPage 里的 navigate 都是写 navigate(`/disease/${id}`) */}
                    <Route path="/disease/:id" element={<DiseaseDetailPage />} />

                    <Route path="/data-viz" element={<DataVizPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />

                    <Route path="/login" element={<AuthPage />} />
                    <Route path="/register" element={<AuthPage />} />

                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/create" element={<CreateArticlePage />} />

                    {/* 法律页面 */}
                    <Route path="/privacy-policy" element={<PrivacyPage />} />
                    <Route path="/legal-notice" element={<LegalPage />} />

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
            <Footer />
        </>
    );
}

export default App;