import { createContext, useContext } from 'react';
import type { HomeLanguage } from '../i18n/language';

interface HomeLanguageState {
    language: HomeLanguage;
    setLanguage: (language: HomeLanguage) => void;
}

export const HomeLanguageContext = createContext<HomeLanguageState | null>(null);

export function useHomeLanguage() {
    const context = useContext(HomeLanguageContext);
    if (!context) throw new Error('Homepage language requires HomeLanguageProvider.');
    return context;
}
