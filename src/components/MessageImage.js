import React from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, Image } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import PropTypes from 'prop-types';

class MessageImage extends React.PureComponent {
  static propTypes = {
    message: PropTypes.object.isRequired,
  };

  state = {
    isLoading: true,
    showImageViewer: false,
  };

  toggleImageViewer = () => {
    this.setState(state => ({ showImageViewer: !state.showImageViewer }));
  };

  render() {
    const { isLoading, showImageViewer } = this.state;
    const { message } = this.props;
    const images = [{ url: message.payload.uri }];

    return (
      <TouchableOpacity onPress={this.toggleImageViewer}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" />
          </View>
        )}

        <Image
          source={{ uri: message.payload.uri }}
          style={styles.messageImage}
          onLoad={() => this.setState({ isLoading: false })}
        />

        <Modal visible={showImageViewer} transparent onRequestClose={this.toggleImageViewer} animationType="fade">
          <ImageViewer imageUrls={images} onCancel={this.toggleImageViewer} enableSwipeDown />
        </Modal>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  messageImage: {
    width: 150,
    height: 112.5,
    borderRadius: 10,
    margin: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
});

export default MessageImage;
