import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { HomeLanguageContext } from './HomeLanguageContext';
import { homeCopy } from '../i18n/homeCopy';
import { getBrowserStorage, readLanguage, saveLanguage, type HomeLanguage } from '../i18n/language';

export function HomeLanguageProvider({ children }: { children: ReactNode }) {
    const { pathname } = useLocation();
    const [preferredLanguage, setPreferredLanguage] = useState(() => readLanguage(getBrowserStorage()));
    // Only the homepage is translated; other routes retain their English scope.
    const language = pathname === '/' ? preferredLanguage : 'en';

    useEffect(() => {
        document.documentElement.lang = language;
        document.title = homeCopy[language].documentTitle;
    }, [language]);

    const setLanguage = (nextLanguage: HomeLanguage) => {
        setPreferredLanguage(nextLanguage);
        saveLanguage(getBrowserStorage(), nextLanguage);
    };

    return (
        <HomeLanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </HomeLanguageContext.Provider>
    );
}
