# Packaging for iOS, iPadOS and Android (future)

Status: **web/PWA only.** No native build of Time Adventure has been made or
tested yet. Nothing here claims App Store or Google Play readiness.

## Two routes

**A. Inside the existing Baby Mo app (recommended first).**

- `babymo-app` is already a Capacitor 8 iOS app with `webDir: www`.
- `npm run build:hub` copies the game to `www/time-adventure/`, so the next
  `npx cap sync ios` and Xcode archive of Baby Mo includes it.
- The hub's parent gate already guards external links in the app.
- This route needs no new App Store listing.

**B. A standalone app.** Add Capacitor to this repo:

```bash
npm i @capacitor/core @capacitor/cli
npx cap init "Time Adventure" id.babymo.time --web-dir dist
npm i @capacitor/ios @capacitor/android
npm run build && npx cap add ios && npx cap add android
npx cap sync
npx cap open ios        # Xcode: set team, bundle id, icons (public/icons/icon-1024.png), launch screen
npx cap open android    # Android Studio: adaptive icon from maskable-512.png, min SDK 23+
```

The build already works inside a native shell:

- URLs are relative.
- Routing uses the hash, so no server rewrites are needed.
- `pwa.ts` skips service-worker registration when `isNative()` is true.

## Platform abstraction: what to plug in

| Capability | Web today (`src/platform/`) | Native plugin to add | Notes |
|---|---|---|---|
| Storage | IndexedDB + localStorage mirror | `@capacitor/preferences` (or keep IndexedDB; WKWebView persists it for apps) | Swap inside `storage.ts` only |
| Haptics | `navigator.vibrate` (Android web) | `@capacitor/haptics` | `audio.ts › haptic()` already calls `Capacitor.Plugins.Haptics` when present |
| Speech | Web Speech API | Optional: `@capacitor-community/text-to-speech` for consistent voices; better, ship recorded clips (`BMT_VOICE` table) | iOS WKWebView supports speechSynthesis, but voices vary |
| Audio focus / silent switch | Web Audio | Usually fine; consider `@capacitor-community/native-audio` for SFX latency on old Android | |
| Screen orientation | CSS + `orientation: any` | `@capacitor/screen-orientation` only if you want to lock it | The game supports all orientations |
| Safe areas | `env(safe-area-inset-*)` | none (works in WKWebView with `viewport-fit=cover`) | Android needs `edge-to-edge` styling in `MainActivity` / Capacitor config |
| Keep awake (timers) | Wake Lock API | `@capacitor-community/keep-awake` | `device.ts › keepAwake()` |
| Notifications | not used (kids) | `@capacitor/local-notifications` only behind the parent gate, opt-in | Not implemented on purpose |
| Foldables | viewport segments / devicePosture | Android: Jetpack WindowManager via a small plugin if the web APIs aren't exposed | Layout already reacts to hinge info |
| In-app purchase / ads | none | — | The Kids Category forbids third-party ads and analytics |

## iPad and iPhone notes

- The `bm-fit.js` zoom trick that the hub's phone-first games use must **not** be applied to this page. It has a real tablet layout.
- **Stage Manager / Split View:** layouts follow `innerWidth`, so resizable windows work.
- **Future foldable iPhone:** no specific API is assumed. If WebKit exposes viewport segments or `devicePosture`, the two-pane layout uses the hinge; otherwise the width-based layout applies.

## Store checklist (to do when packaging)

- [ ] Real-device testing on iPhone (SE, standard, Pro Max), iPad (mini, Air/Pro, landscape plus Stage Manager), Android phone and tablet, and one foldable
- [ ] Recorded voice clips for all lines (see ASSETS.md); don't rely on device TTS for review
- [ ] Privacy nutrition label: "Data Not Collected"; Kids Category age band 5 & under / 6–8
- [ ] Parent gate on any future external link (the hub's gate already covers the hub app)
- [ ] App icons and splash from `public/icons/icon-1024.png`; screenshots from `npm run e2e` (`qa-shots/`), retaken at store sizes using render-1 art
