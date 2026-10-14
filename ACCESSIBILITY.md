# Accessibility Statement

Guardians of Health aims to make its health education pages usable by people with different abilities, devices, and ways of interacting. Accessibility reports and improvements are welcome.

## Goals and intended environments

We aim toward the [Web Content Accessibility Guidelines (WCAG) 2.2, Level AA](https://www.w3.org/TR/WCAG22/). This is a development goal, not a claim of conformance or certification. The prototype has not completed an independent accessibility audit or a comprehensive assistive-technology test.

The intended environments are current Chrome, Edge, Firefox, and Safari on desktop and mobile, with JavaScript enabled. Keyboard-only use, browser zoom, NVDA with Firefox or Chrome, and VoiceOver with Safari are priority verification targets; support across these combinations has not yet been fully verified.

## Known limitations

The current source contains areas that need further work:

- The signed-in navigation avatar uses a clickable `div` without native keyboard activation. Access to its menu can be difficult for keyboard and assistive-technology users.
- Some authentication inputs rely on placeholder text, and some profile labels are not programmatically associated with their inputs. Accessible names and error announcements need review.
- Animations and transitions are not consistently covered by reduced-motion preferences across pages.
- Health data charts are embedded from Our World in Data. Their controls, keyboard behavior, and nonvisual alternatives depend partly on that external service; GOH does not currently provide equivalent local data tables.
- Contrast, focus order, zoom and reflow, mobile navigation, and screen-reader announcements across all routes still need a full manual audit.

These are documented barriers and testing gaps, not a complete list. A published statement does not mean these issues have been fixed.

## Report a barrier

Use the [accessibility issue form](https://github.com/chenjinxian1/GOH-frontend/issues/new?template=accessibility_report.yml), or email [chenjinxian443357848@student.usm.my](mailto:chenjinxian443357848@student.usm.my) if a public issue is unsuitable or GitHub itself is inaccessible to you.

Please describe the page, what you were trying to do, what blocked you, and the result you expected. If comfortable sharing, include your browser, device, assistive technology and version, zoom level, and reproduction steps. Screenshots or recordings can help but are optional. Remove personal or health information; you do not need to disclose a disability or diagnosis.

Maintainers will review reports and consider impact and available workarounds when prioritizing fixes. Response and resolution times depend on availability. You may request an alternative format or a workaround through the same contact.

## Contribute and verify

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup and submission guidance. For interface changes, check keyboard operation, meaningful labels and headings, visible focus, contrast, 200% text zoom, reflow at 320 CSS pixels, reduced motion, and relevant screen-reader behavior. Record the environments actually tested and any remaining barriers in the pull request.

Last reviewed: 14 October 2026. The limitations above were identified from source review, not a completed WCAG audit.
