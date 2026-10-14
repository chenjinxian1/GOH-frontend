export type HomeLanguage = 'en' | 'zh-CN';

export const languageStorageKey = 'goh_home_language';

export function readLanguage(storage: Pick<Storage, 'getItem'> | null): HomeLanguage {
    try {
        return storage?.getItem(languageStorageKey) === 'zh-CN' ? 'zh-CN' : 'en';
    } catch {
        return 'en';
    }
}

export function saveLanguage(storage: Pick<Storage, 'setItem'> | null, language: HomeLanguage): void {
    try {
        storage?.setItem(languageStorageKey, language);
    } catch {
        // A blocked or full store must not prevent the current session switching.
    }
}

export function getBrowserStorage(): Storage | null {
    try {
        return typeof window === 'undefined' ? null : window.localStorage;
    } catch {
        return null;
    }
}
