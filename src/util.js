import { Dimensions, Platform } from 'react-native'

export function isIOS() {
  return Platform.OS === 'ios';
}

export function isAndroid() {
  return Platform.OS === 'android';
}

export function isIphoneX() {
  const { height, width } = Dimensions.get('window')
  return isIOS() && (height === 812 || width === 812)
}

export function getCurrentLocation() {
  return new Promise(
    (resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords)
        },
        () => {
          resolve(null)
        },
      )
    },
    {
      enableHighAccuracy: true,
    },
  )
}
