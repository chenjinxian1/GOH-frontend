# Security Policy

## Project scope and supported versions

Guardians of Health is an academic frontend demonstration. Security fixes are considered for the latest code on `main`; older snapshots, forks, and individual deployments do not have a separate maintenance commitment. There is no long-term support release or guaranteed response time.

This project is not intended to store real patient records or provide clinical care. Its local demo authentication is not suitable for production.

## Report a vulnerability privately

Please do not open a public issue or pull request containing vulnerability details, credentials, or personal information.

Email the project maintainer, Chen Jinxian, at [chenjinxian443357848@student.usm.my](mailto:chenjinxian443357848@student.usm.my) with the subject `GOH security report`. This is the project contact already listed in the application footer.

Include, where possible:

- The affected page, file, feature, and commit or version.
- A clear description of the risk and expected impact.
- Minimal reproduction steps using fictional data and accounts you control.
- Your browser, operating system, and relevant configuration, with all secrets removed.
- A suggested fix or a safe proof of concept, if available.

Do not email live passwords, provider keys, access tokens, or identifiable health records. If a credential has leaked, its owner should revoke or rotate it promptly; deleting it from a public file alone does not invalidate it.

The maintainer will assess the report, request clarification where needed, and coordinate remediation and disclosure with the reporter as availability allows. If you have not received a response, follow up through the same private channel. Please allow time for a fix before sharing exploit details publicly. No bug bounty or response deadline is promised.

## Important demo limitations

- **Browser-visible configuration:** Vite embeds `VITE_` variables in the client bundle. A provider secret in `VITE_LLM_API_KEY` can be read by visitors. Use a backend proxy with server-side secrets for a public production service.
- **Local demo accounts:** Accounts, profiles, and favorites use browser storage. Use fictional data and a password you do not use elsewhere. Browser storage is not a secure identity or patient-record system.
- **Firebase:** Supplying Firebase configuration does not establish that a deployment is secure. A deployment owner must review authentication, Firestore rules, permissions, and data handling for their own project.
- **AI and external content:** Treat generated answers, rendered Markdown, imported articles, images, and embedded content as untrusted input. AI output is educational and must not be relied on for diagnosis, treatment, or emergencies.

These limitations describe the prototype's current scope; reports of additional risks or unsafe changes are welcome. Investigate only systems and accounts you own or are authorized to test. Avoid accessing another person's data, disrupting a service, or making paid provider calls without authorization.

For ordinary bugs or setup questions, use the [issue templates](https://github.com/chenjinxian1/GOH-frontend/issues/new/choose). For community conduct concerns, see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
