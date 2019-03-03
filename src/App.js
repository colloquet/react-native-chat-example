import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';

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

const AppContainer = createAppContainer(AppNavigator);

class App extends React.Component {
  render() {
    return (
      <ActionSheetProvider>
        <AppContainer />
      </ActionSheetProvider>
    );
  }
}

export default App;
