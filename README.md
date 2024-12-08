# Welcome to your Attuned app 👋

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Build or Update?

- if you only changed JS code, update the app.
- if you changed any native code, or dependencies, rebuild the app.

### Build your app

This guide provides step-by-step instructions for building and uploading an app to TestFlight using Expo EAS, along with solutions to potential errors you may encounter.

### Prerequisites

1. Apple Developer Account: Ensure you have access to an Apple Developer Account with proper roles (e.g., Admin, App Manager, or Developer).

2. Expo EAS CLI: Install or update the EAS CLI to the latest version:

```bash
npm install -g eas-cli
```

### Configure the Project

1. Update Build Number in **app.json** before building it for iOS:

```json
"ios": {
  "buildNumber": "13" // Increment the build number
}
```

2. Building the App

Run the following command to build the app for iOS:

```bash

eas build --platform ios --profile production
```

Be sure to use Apple Developer Account of Attuned team.

**Key Prompts**

When asked: Generate a new Apple Distribution Certificate?

- If you're unsure or need a fresh certificate, choose Yes (y).

When asked: Generate a new Apple Provisioning Profile?

- Typically, choose Yes (y) to ensure a valid profile.

3. Upload to TestFlight

After the build is completed, you'll get a link to download the .ipa file (e.g., https://expo.dev/artifacts/...). Use this file to upload to TestFlight:

Using **Transporter**

- Install the Transporter app from the Mac App Store.
- Open Transporter and log in with your Apple Developer Account.
- Drag and drop the .ipa (downloaded from expo) file into Transporter.
- Click Deliver to upload the build.

4. TestFlight Setup

   1. Log in to App Store Connect: https://appstoreconnect.apple.com/.
   2. Enable Internal Testing:
      • Go to the TestFlight tab.
      • Add team members to Internal Testing.
      • Select the build and click Enable Testing.
   3. For External Testers:
      • Submit the build for TestFlight Beta Review.

5. Potential Errors and Solutions

Error: The bundle version must be higher than the previously uploaded version

- Cause: The ios.buildNumber in your configuration is the same or lower than a previous build.
- Solution: Increment the buildNumber in your app.json or app.config.js and rebuild:

```json
   "ios": {
      "buildNumber": "14"
   }
```

Error: Missing Compliance

- Cause: Apple requires you to confirm encryption compliance.
- Solution:
- Add the following key to app.json or app.config.js:

```json
      "ios": {
         "infoPlist": {
            "ITSAppUsesNonExemptEncryption": false
         }
      }
```

- Rebuild and upload the app.

### Conclusion

Once the app is uploaded to TestFlight, internal testers can immediately access the app, and external testers can join after TestFlight Beta Review is approved. Always increment your version and build numbers for subsequent uploads to avoid errors.

## Update App Version

1. Update the version in **app.json**

```json
"version": "1.2.1"
```

## Version 1.2.1

- Fix the bug that the app crashed when the user didn't have any recording data.
- Add the feature that allows users to view their voice graph in Pitch Tracker screen.
