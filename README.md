# 💬 React Native Chat Example
A simple example of how to build a chat interface using React Native. With support for image and location messages.

## Room List Screen
|iOS|Android|
--- | ---
|![iOS Room List Screen](https://img.eservice-hk.net/upload/2019/03/03/190002_1e0dd8da18e3d6b5ea804e3095f73e85.png)|![Android Room List Screen](https://img.eservice-hk.net/upload/2019/03/03/190006_c9c86cc406e0c7fcb472324064abb76e.png)|

## Room Screen
|iOS|Android|
--- | ---
|![iOS Room Screen](https://img.eservice-hk.net/upload/2019/03/03/190004_d28787b7a81ac478349bf40f498ac90c.png)|![Android Room Screen](https://img.eservice-hk.net/upload/2019/03/03/190006_3200a92519f104bc935bda8fe1c16767.png)|

## Message Schema
```
{
  id, // message ID
  type, // message type
  from, // from which user ID
  text, // context for text messages
  payload, // context for other types of messages
  createdAt, // timestamp
},
```

## How to run the project
- `npm install`
- To run from CLI: `react-native run-ios` or `react-native run-android`.
- Or run from XCode or Android studio.

### Note for Android users
- You need to replace the Google Map API key in `/android/app/src/main/AndroidManifest.xml` for maps to work on Android. (see https://github.com/react-native-community/react-native-maps/blob/master/docs/installation.md#troubleshooting)
- You will have to add this line `implementation "com.android.support:appcompat-v7:${rootProject.ext.supportLibVersion}"`  to `/node_modules/react-native-maps/lib/android/build.gradle`. (see https://github.com/react-native-community/react-native-maps/issues/2695)

## Used Libraries
- [react-navigation](https://github.com/react-navigation/react-navigation)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-native-parsed-text](https://github.com/taskrabbit/react-native-parsed-text)
- [react-native-maps](https://github.com/react-native-community/react-native-maps)
- [react-native-image-zoom-viewer](https://github.com/ascoders/react-native-image-viewer#readme)
- [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)
- [react-native-action-sheet](https://github.com/expo/react-native-action-sheet)
