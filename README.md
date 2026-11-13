# Komkom Wallet Mobile Login Automation

This project automates the Komkom Wallet Android login flow with WebdriverIO, Appium, Mocha, and Chai. The requested login spec covers invalid-password rejection, unregistered-email rejection, and successful login with a dashboard check.

## Prerequisites

- Node.js and npm installed.
- Java Development Kit and Android SDK installed and configured for Appium's Android UiAutomator2 driver. Android SDK Platform-Tools (`adb`) must be available on `PATH`.
- An Android device or emulator with the Komkom Wallet app installed. The current WebdriverIO configuration targets package `com.komkom` and activity `com.komkom.MainActivity`.
- USB debugging enabled for a physical device, with the device authorized by the computer. Confirm it is visible with `adb devices`.
- Appium Server 2 installed and the UiAutomator2 driver installed. Appium is a system prerequisite; it is not listed in this project's npm dependencies.

The configuration connects to Appium at `127.0.0.1:4723` using the root path `/`. If your server uses another address or port, update `hostname`, `port`, or `path` in `wdio.conf.js`.

## Dependencies

The project declares these development dependencies in `package.json` (the lockfile is `package-lock.json`):

- `webdriverio` and `@wdio/cli`, `@wdio/local-runner`, `@wdio/mocha-framework`, `@wdio/spec-reporter` (10.x ranges)
- `mocha` through the WebdriverIO Mocha framework
- `chai` (6.x range)
- `dotenv` (18.x range)

## Setup

From the project root, install the locked npm dependencies:

```sh
npm ci
```

Create a local `.env` file in the project root. Keep it private; `.env` is ignored by Git. Set the following variables to credentials appropriate for the assessment environment:

```dotenv
VALID_EMAIL=
VALID_PASSWORD=
INVALID_EMAIL=
INVALID_PASSWORD=
```

`VALID_EMAIL` and `VALID_PASSWORD` are used by the successful-login case. The invalid-password case uses `VALID_EMAIL` with `INVALID_PASSWORD`; the unregistered-email case uses `INVALID_EMAIL` with `INVALID_PASSWORD`. Do not commit `.env`, put real values in this README, or show credentials in a screen recording. The test data module loads `.env` using `dotenv/config`.

The current device UDID is set directly in `wdio.conf.js` under `appium:udid`. Change that value to the UDID shown by `adb devices` for your device or emulator before running. The config also sets `appium:noReset` to `true`, so the installed app and its state are retained between sessions.

## Run only the login spec

Start the Appium server in a separate terminal:

```sh
appium --address 127.0.0.1 --port 4723
```

With the device connected, app installed, and `.env` configured, run this command from the project root to select only the login test file:

```sh
npx wdio run ./wdio.conf.js --spec ./test/specs/login.test.js
```

The `npm test` script runs `wdio run ./wdio.conf.js` with the full spec glob from the configuration, so use the explicit `--spec` command above for a login-only assessment run. The spec reporter prints results in the terminal.

## Login scenarios

`test/specs/login.test.js` contains three test cases:

1. Reject a registered email with an incorrect password and check the `invalid password` message.
2. Reject an unregistered email and check the `email address not found` message.
3. Log in with valid credentials and check that the dashboard's `Total Cash Balance` label is displayed.


## Recording the run

1. Open OBS and arrange the Android device view and the test terminal so both are readable.
2. Hide or close any window that contains `.env` or credential values. Verify no actual credentials are visible on the device or in the terminal.
3. Start the Appium server, then start OBS recording.
4. Run the login-only command shown above and let it complete without manually interacting with the device.
5. Capture the final terminal test summary, then stop and save the recording. Use the assessment's required format and naming convention.

An MKV recording named `2026-11-13 15-02-50.mkv` was present in the project when this README was prepared. Confirm that it shows the final login-only run and meets the assessment's recording requirements before submitting it.

## Known limitations

- The device UDID is hard-coded in `wdio.conf.js`; update it for another device or emulator.
- `appium:noReset: true` preserves app state. The test does not reset app data, and the project does not define a dedicated reset or cleanup step.
- Credentials are read from environment variables, but the project does not validate that all four are set before the run. Missing or incorrect values can cause test failures.
- The login test relies on the app's current Android resource IDs and displayed error/dashboard text. Changes to the app UI may require locator or assertion updates in `pages/LoginPage.js` and the spec.
- The login spec has three test cases.
- `reports/` is ignored by Git and contained no report files when inspected. The configured reporter writes results to the terminal; no report artifact is configured by the project.