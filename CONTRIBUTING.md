# Contributing to Guardians of Health

Thanks for helping improve Guardians of Health (GOH), an academic healthcare education frontend. Contributions to documentation, accessibility, user experience, educational content, and code are welcome. You may open issues in English or Chinese; keep code identifiers consistent with the existing English codebase.

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md). For a vulnerability or exposed credential, follow the private reporting process in [SECURITY.md](SECURITY.md) instead of opening a public issue.

## Before you start

- Search [existing issues](https://github.com/chenjinxian1/GOH-frontend/issues) and [pull requests](https://github.com/chenjinxian1/GOH-frontend/pulls) to avoid duplicate work.
- Use the bug report, feature request, or accessibility report in the [issue chooser](https://github.com/chenjinxian1/GOH-frontend/issues/new/choose).
- For a large feature or architectural change, describe the problem and proposed approach in an issue first. Small fixes and documentation corrections can go straight to a pull request.
- Keep each contribution focused. Avoid unrelated formatting changes, generated output, dependency upgrades, or changes to demo assets.

## Set up locally

Use Node.js 22.12 or newer (Node.js 24 is also suitable) and npm. The frontend lives in the nested `goh-frontend/` directory; the repository root contains the community documentation.

Fork the repository, clone your fork, and create a branch:

```bash
git clone https://github.com/YOUR-USERNAME/GOH-frontend.git
cd GOH-frontend
git switch -c fix/describe-your-change
cd goh-frontend
npm ci
npm run dev
```

`npm ci` installs the versions recorded in `package-lock.json`. The development server prints its address, normally `http://localhost:5173/`.

No API key is required to build the app or work on local demo pages. To exercise AI or Firebase integrations, copy the relevant settings from `.env.example` or `.env.local.example` into your own `goh-frontend/.env.local`. See the [README configuration guide](README.md#environment-variables).

All `VITE_` values are visible in the browser build. Never put a production provider secret in this frontend, commit your local environment file, or attach credentials or real patient information to an issue. Use fictional accounts and health examples during testing. Demo authentication uses browser storage and is not production authentication.

## Make and check your change

Match the existing React, TypeScript, and CSS patterns. Reuse shared components where practical, and keep documentation consistent with the implemented behavior.

Run these commands inside `goh-frontend/`:

```bash
npm run lint
npm test
npm run build
npm run preview
```

`npm test` runs the homepage language preference regression tests using Node.js 22.12+ or 24. These checks cover default English, restoring a choice, persistence, and blocked storage; they do not replace the browser checks below. Do not report tests as passing when only a build was run. Existing lint findings may remain in untouched files: report their output, avoid adding new findings, and keep unrelated fixes in a separate contribution.

For a user-facing change, open the app and check the affected flow:

- Navigate directly to the affected route and refresh it.
- Check desktop and narrow mobile layouts, keyboard access, visible focus, and usable form labels.
- Exercise relevant loading, empty, success, and error states. Check the browser console for new errors.
- For local account or favorites changes, use a disposable demo account and check refresh and sign-out behavior.
- For AI changes, document which provider configuration you used without including its key; check missing configuration and request failure behavior.

See [ACCESSIBILITY.md](ACCESSIBILITY.md) for accessibility goals and known barriers. For documentation-only work, check file paths, links, examples, and spelling; explain when app checks do not apply.

## Health content and third-party material

GOH provides general educational information, not diagnosis or treatment. Keep the medical disclaimer visible and avoid personal medical advice. For changes to health facts or statistics, cite an authoritative source and its publication or update date so reviewers can verify the claim. Do not upload private health records or identifiable patient data.

Only submit material you have the right to contribute. Preserve third-party notices and image credits. Existing image sources are listed in [Content Image Sources](goh-frontend/public/content-images/README.md); university branding, external datasets, embedded services, and third-party assets may have separate terms.

## Open a pull request

Push your branch to your fork and open a pull request against `main`. The [pull request template](.github/PULL_REQUEST_TEMPLATE.md) asks for the problem, resulting behavior, and evidence from your checks. Include before/after screenshots for visual changes and link any related issue.

Use a clear title, such as `Fix keyboard access to the profile menu` or `Document local AI setup`. Explain incomplete checks honestly. Maintainers may request changes before merging; review and response times depend on availability.

Unless you explicitly state otherwise, your intentionally submitted original contributions are provided under the project's [MIT License](LICENSE). This does not override separate licenses or attribution requirements for third-party material.
