import assert from 'node:assert/strict';
import test from 'node:test';
import { languageStorageKey, readLanguage, saveLanguage } from '../src/i18n/language.ts';

test('a new visitor sees English', () => {
    assert.equal(readLanguage({ getItem: () => null }), 'en');
});

test('an explicit Simplified Chinese choice is restored', () => {
    assert.equal(readLanguage({ getItem: () => 'zh-CN' }), 'zh-CN');
});

test('an explicit English choice is restored', () => {
    assert.equal(readLanguage({ getItem: () => 'en' }), 'en');
});

test('unrecognized stored values fall back to English', () => {
    for (const value of ['', 'fr', 'zh-TW', 'undefined', '{}']) {
        assert.equal(readLanguage({ getItem: () => value }), 'en');
    }
});

test('blocked or unavailable storage does not prevent a default homepage', () => {
    assert.equal(readLanguage(null), 'en');
    assert.equal(readLanguage({ getItem() { throw new Error('Storage blocked'); } }), 'en');
});

test('a changed preference survives the next visit', () => {
    const values = new Map();
    const storage = {
        getItem: key => values.get(key) ?? null,
        setItem: (key, value) => values.set(key, value),
    };
    saveLanguage(storage, 'zh-CN');
    assert.equal(values.get(languageStorageKey), 'zh-CN');
    assert.equal(readLanguage(storage), 'zh-CN');
    saveLanguage(storage, 'en');
    assert.equal(readLanguage(storage), 'en');
});

test('saving a choice tolerates unavailable or full storage', () => {
    assert.doesNotThrow(() => saveLanguage(null, 'zh-CN'));
    assert.doesNotThrow(() => saveLanguage({ setItem() { throw new Error('Quota exceeded'); } }, 'zh-CN'));
});
