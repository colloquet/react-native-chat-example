import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

function MessageLocation({ message, navigation }) {
  const location = { latitude: message.payload.latitude, longitude: message.payload.longitude };

  return (
    <TouchableOpacity onPress={() => navigation.push('Location', { message })}>
      <View style={styles.messageLocation} pointerEvents="none">
        <MapView
          style={{ flex: 1 }}
          liteMode
          initialRegion={{
            ...location,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
          <Marker coordinate={location} />
        </MapView>
      </View>
    </TouchableOpacity>
  );
}

MessageLocation.propTypes = {
  message: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  messageLocation: {
    width: 150,
    height: 112.5,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
});

export default withNavigation(MessageLocation);
