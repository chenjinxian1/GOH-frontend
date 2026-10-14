# Homepage language selection

## Request and acceptance criteria

Add a user-controlled English / Simplified Chinese option to the homepage. A first visit must use English regardless of browser language. Remember an explicit choice across refreshes and later visits. Translate the full homepage, including its navigation, footer, category recommendations, tooltips, loading text, and accessible labels. Preserve routes, account behavior, and the existing visual style.

The requested scope is the homepage. Other routes keep their current English content and document language. Returning to the homepage restores its selected language. The selector appears on the homepage only, so other pages do not imply translation coverage they do not have.

## Product and layout

- Put a native language select beside the account actions in the homepage navigation.
- Display the language names in their own language: `English` and `简体中文`.
- Keep the existing navy/cyan palette, dimensions, cards, and interactions.
- Use the same control for signed-in and signed-out visitors. Do not depend on an account.
- Give the select a bilingual accessible label and a visible keyboard focus indicator.
- Hide the desktop navigation links earlier when the additional control would crowd them. On narrow phones, use a brand row and a language/account action row.
- Allow Chinese headings to wrap naturally with an appropriate Chinese font fallback and line height.

## Options considered

1. Native select with a small shared preference provider (selected): built-in keyboard support, little new code, no dependencies, consistent state across homepage regions.
2. Two language buttons: more immediately visible but occupy more of the already full navigation bar.
3. Full-site localization framework: useful if all routes are translated later; unnecessary for this bounded homepage request.

## Component tree and data flow

```text
BrowserRouter
  HomeLanguageProvider
    App
      Navbar
        HomepageLanguageSelect (homepage only)
      Routes
        HomePage (localized copy and stable category keys)
        Existing other pages (English)
      Footer (localized on homepage)
```

The provider initializes its preference lazily from `goh_home_language`. Only `en` and `zh-CN` are accepted; a missing, invalid, or inaccessible value uses English. Selecting a language updates the interface immediately and attempts to save the preference. If storage is blocked or full, the current session still switches successfully. No browser-language detection, account data, cookies, or network translation service is involved.

Keep shared navigation/footer strings and homepage strings in typed English and Chinese dictionaries. Category identifiers and destinations remain stable when the copy changes. Update `html.lang` and the document title for the displayed route and language.

## State coverage

- First visit: English selected and English homepage.
- Explicit choice: all homepage regions switch together without a reload.
- Refresh or return home: restore the explicit choice.
- Invalid/blocked storage: safe English initialization; selection still works in memory.
- Account and category state: preserve existing state and destinations while switching.
- Loading: translated loading label/text; no translation request or separate loading state.
- Keyboard/mobile: native select interaction, clear focus, no horizontal page overflow.

## Risks and corrections

| Risk | Correction |
| --- | --- |
| Crowded navigation | Earlier desktop-link collapse and a deliberate phone layout |
| Partial homepage translation | Inventory static copy, data arrays, tooltips, and accessible labels |
| Category resets when language changes | Retain language-independent category keys |
| Chinese display text looks cramped | Scoped Chinese typography and wrapping |
| Preference failures blank the page | Guard storage reads/writes and retain in-memory selection |

## Verification before publication

1. Observe the missing selector in the running baseline before implementation.
2. Add meaningful preference tests for default English, persisted Chinese, invalid values, persistence, and storage exceptions; observe failures for missing behavior.
3. Run preference tests, TypeScript/build, and lint on all changed application files. Compare full lint with the known baseline of nine errors and two warnings in untouched application files.
4. In a real browser, switch English to Chinese and back, refresh, navigate away and return, change a category while switching, and exercise the select by keyboard.
5. View desktop and 320/390-pixel phone layouts in both languages; check footer content, focus, console errors, and overflow. Use only fictional local test data and no provider secrets.
6. Publish only after these checks pass; verify the GitHub update and retain screenshots of the resulting interface.
