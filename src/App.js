import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import RoomListScreen from './screens/RoomListScreen';
import RoomScreen from './screens/RoomScreen';
import LocationScreen from './screens/LocationScreen';

const AppNavigator = createStackNavigator(
  {
    RoomList: RoomListScreen,
    Room: RoomScreen,
    Location: LocationScreen,
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#000',
    },
  },
);

export default createAppContainer(AppNavigator);
