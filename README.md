# Zazen Timer

A simple, focused zen meditation timer built with Expo (React Native) and TypeScript. It supports two session types—Zazen only and a Complete session (Zazen → Kinhin → Zazen)—with shadcn-inspired styling, internationalization (English/Spanish), and gentle bell sounds at transitions.

## Features

- Two session types:
	- Zazen — 30 minutes
	- Complete — Preparation (20s) → Zazen (30m) → Kinhin (5m) → Preparation (20s) → Zazen (30m)
- Auto-progressing periods with cleanup when navigating away
- Bell sound at the start and end of Zazen/Kinhin periods
- i18n with English and Spanish
- Shadcn-inspired components adapted for React Native

## Project Structure

```
.
├── App.tsx
├── app.json
├── babel.config.js
├── package.json
├── tsconfig.json
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── SessionImage.tsx
│   ├── constants/
│   │   └── timerSequences.ts
│   ├── hooks/
│   │   ├── useBellSound.ts
│   │   └── useTimer.ts
│   ├── localization/
│   │   ├── i18n.ts
│   │   └── translations/
│   │       ├── en.json
│   │       └── es.json
│   ├── navigation/
│   │   ├── AppNavigator.tsx
│   │   └── types.ts
│   ├── screens/
│   │   ├── LandingScreen.tsx
│   │   ├── SessionSummaryScreen.tsx
│   │   └── TimerScreen.tsx
│   ├── theme/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   └── types/
│       └── timer.ts
└── assets/
		├── images/
		│   ├── zazen.png              # add (not included)
		│   └── zazen_kinhin.png       # add (not included)
		└── sounds/
				└── bell.mp3               # placeholder; replace with your preferred bell
```

## Getting Started

Prereqs: Node 18+, npm, and Expo CLI (npx will install if missing).

1) Install dependencies

```bash
npm install
```

2) Start the development server

```bash
npm run start
```

3) Open on a device/emulator

- iOS: `npm run ios`
- Android: `npm run android`
- Web (for basic layout checks): `npm run web`

Note: The timer and audio logic are intended for native (iOS/Android). Web support is limited.

## Internationalization

The app auto-detects device language and falls back to English. You can edit translations in:

- `src/localization/translations/en.json`
- `src/localization/translations/es.json`

To add a new language, append a new resource in `src/localization/i18n.ts`.

## Replacing Assets

- Session images: place your images at
	- `assets/images/zazen.png`
	- `assets/images/zazen_kinhin.png`
	The UI uses a styled placeholder until you add these images.

- Bell sound: replace `assets/sounds/bell.mp3` with your bell. The app gracefully handles the placeholder file and errors while loading.

## Development Notes

- Timer logic lives in `src/hooks/useTimer.ts` and progresses through a sequence of periods defined in `src/constants/timerSequences.ts`.
- Preparation periods count down in seconds; Zazen and Kinhin update once per minute for a calm experience.
- The timer stops and cleans up when navigating away from the Timer screen.

## License

MIT

