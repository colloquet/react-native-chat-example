import React from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

class LocationScreen extends React.PureComponent {
  static navigationOptions = {
    headerTitle: 'Location',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    const message = this.props.navigation.getParam('message', {});

    return (
      <View style={{ position: 'relative', flex: 1 }}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={{ flex: 1 }}
          initialRegion={{
            ...message.payload,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation
        >
          <Marker coordinate={message.payload} />
        </MapView>
      </View>
    );
  }
}

export default LocationScreen;
