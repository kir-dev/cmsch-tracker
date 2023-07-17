# CMSch Tracker

![supports iOS](https://img.shields.io/badge/iOS-999999.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff)
![supports Android](https://img.shields.io/badge/Android-A4C639.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff)

Mobile application for iOS and Android based on React Native & Expo.

## Development

1. Install dependencies with `yarn install`
2. Run with `yarn ios` or `yarn android`

## Release

Release is done automatically using GitHub Actions and EAS using EAS Update. In this case it is supposed that you did not change any native code or config (you updated something in the Update layer).

If native code (native layer) or config is changed (i.e. app.json, app.config.ts, etc.) a new build and submit to app stores are needed.

Run `yarn build:ios` and `yarn build:android` to tell EAS to build new binaries. This will take some time. On success, create a new AppStore and Play Store submission using `yarn submit:ios` and `yarn submit:android`.
