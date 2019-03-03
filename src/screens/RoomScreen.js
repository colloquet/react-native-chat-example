import React from 'react';
import { KeyboardAvoidingView, FlatList, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Feather';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import ChatFooter from '../components/ChatFooter';
import MessageItem from '../components/MessageItem';
import * as util from '../util';
import { messageType, IPHONE_X_BOTTOM_PADDING } from '../constant';

const NAVIGATION_BAR_HEIGHT = util.isIphoneX() ? 88 : 64;
const FOOTER_BOTTOM_PADDING = util.isIphoneX() ? IPHONE_X_BOTTOM_PADDING : 0;

let messageId = 0;

class RoomScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'Room'),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          id: messageId++,
          type: messageType.TEXT,
          from: 2,
          text: 'Hi!',
          createdAt: Date.now(),
        },
        {
          id: messageId++,
          type: messageType.IMAGE,
          from: 2,
          payload: {
            uri:
              'https://images.unsplash.com/photo-1551446591-142875a901a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60',
          },
          createdAt: Date.now(),
        },
        {
          id: messageId++,
          type: messageType.LOCATION,
          from: 2,
          payload: {
            latitude: 37.785834,
            longitude: -122.406417,
          },
          createdAt: Date.now(),
        },
      ],
      showScrollToBottomButton: false,
      showLocationPicker: false,
    };
    this.flatList = React.createRef();
  }

  getCurrentUserId = () => 1;

  makeMessage = ({ type, text, payload = null }) => ({
    id: messageId++,
    type,
    from: this.getCurrentUserId(),
    text,
    payload,
    createdAt: Date.now(),
  });

  scrollToBottom = () => {
    if (this.state.messages.length) {
      this.flatList.current.scrollToIndex({ index: 0, animated: true });
    }
  };

  sendTextMessage = text => {
    const newMessage = this.makeMessage({
      type: messageType.TEXT,
      from: this.getCurrentUserId(),
      text,
    });
    this.handleSubmit(newMessage);
  };

  sendCurrentLocation = async () => {
    const location = await util.getCurrentLocation();
    this.sendLocationMessage(location);
  };

  sendLocationMessage = ({ latitude, longitude }) => {
    const newMessage = this.makeMessage({
      type: messageType.LOCATION,
      payload: { latitude, longitude },
    });
    this.handleSubmit(newMessage);
  };

  sendImageFromLibrary = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        includeExif: true,
      });
      this.sendImageMessage(image.path);
    } catch (err) {
      console.log(err);
    }
  };

  sendImageFromCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        mediaType: 'photo',
        includeExif: true,
      });
      this.sendImageMessage(image.path);
    } catch (err) {
      console.log(err);
    }
  };

  sendImageMessage = uri => {
    const newMessage = this.makeMessage({
      type: messageType.IMAGE,
      payload: { uri },
    });
    this.handleSubmit(newMessage);
  };

  handleShowActionSheet = () => {
    this.props.showActionSheetWithOptions(
      {
        options: ['Location', 'Photo Library', 'Camera', 'Cancel'],
        icons: [
          <Icon name="map-pin" size={24} />,
          <Icon name="image" size={24} />,
          <Icon name="camera" size={24} />,
          <Icon name="x" size={24} />,
        ],
        cancelButtonIndex: 3,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.sendCurrentLocation();
            break;
          case 1:
            this.sendImageFromLibrary();
            break;
          case 2:
            this.sendImageFromCamera();
            break;
          default:
            break;
        }
      },
    );
  };

  handleSubmit = message => {
    this.setState(state => ({
      messages: [message, ...state.messages],
    }));
    this.scrollToBottom();
  };

  handleMessageListScroll = event => {
    if (event.nativeEvent.contentOffset.y > 300) {
      this.setState({ showScrollToBottomButton: true });
    } else {
      this.setState({ showScrollToBottomButton: false });
    }
  };

  renderMessage = ({ item, index }) => {
    const prevMessage = this.state.messages[index + 1];
    const nextMessage = this.state.messages[index - 1];
    const isUserLatest = !!(prevMessage && prevMessage.from !== item.from);
    const isLatest = !nextMessage || nextMessage.from !== item.from;
    const isSelf = item.from === this.getCurrentUserId();
    const isFirst = index === this.state.messages.length - 1;

    return (
      <MessageItem
        message={item}
        isLatest={isLatest}
        isFirst={isFirst}
        isUserLatest={isUserLatest}
        isSelf={isSelf}
      />
    );
  };

  render() {
    const { messages, showScrollToBottomButton } = this.state;

    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={NAVIGATION_BAR_HEIGHT - FOOTER_BOTTOM_PADDING}
        enabled={util.isIOS()}
      >
        <View style={{ flex: 1 }}>
          <FlatList
            ref={this.flatList}
            style={{ flex: 1 }}
            data={messages}
            renderItem={this.renderMessage}
            keyExtractor={item => `${item.id}`}
            inverted
            scrollsToTop={false}
            keyboardDismissMode="on-drag"
            onScroll={this.handleMessageListScroll}
            scrollEventThrottle={300}
          />

          {showScrollToBottomButton && (
            <TouchableOpacity style={{ position: 'absolute', bottom: 20, right: 20 }} onPress={this.scrollToBottom}>
              <View style={styles.scrollToBottomButton}>
                <Icon name="arrow-down" size={16} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <ChatFooter onSubmit={this.sendTextMessage} onShowActions={this.handleShowActionSheet} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  scrollToBottomButton: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default connectActionSheet(RoomScreen);
