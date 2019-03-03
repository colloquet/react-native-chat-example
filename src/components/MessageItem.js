import React from 'react';
import { Image, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';

import MessageText from './MessageText';
import MessageLocation from './MessageLocation';
import MessageImage from './MessageImage';

import { messageType } from '../constant';

const MESSAGE_PADDING_BOTTOM = 8;
const avatarPlaceholder = require('../assets/images/avatar.png');

class MessageItem extends React.PureComponent {
  static propTypes = {
    message: PropTypes.object.isRequired,
    isLatest: PropTypes.bool.isRequired,
    isFirst: PropTypes.bool.isRequired,
    isUserLatest: PropTypes.bool.isRequired,
    isSelf: PropTypes.bool.isRequired,
  };

  renderMessageContent = (message, isSelf) => {
    switch (message.type) {
      case messageType.TEXT:
        return <MessageText message={message} isSelf={isSelf} />;
      case messageType.LOCATION:
        return <MessageLocation message={message} />;
      case messageType.IMAGE:
        return <MessageImage message={message} />;
      default:
        return <Text style={[styles.unsupportedMessage, isSelf && styles.selfMessageText]}>Unsupported message</Text>;
    }
  };

  render() {
    const { message, isLatest, isFirst, isUserLatest, isSelf } = this.props;

    return (
      <View
        style={[
          styles.messageItem,
          isSelf && styles.selfMessageItem,
          isUserLatest && styles.userLatestMessageItem,
          isFirst && styles.firstItem,
        ]}
      >
        {isSelf || (
          <React.Fragment>
            {isLatest && (
              <View style={{ position: 'absolute', bottom: MESSAGE_PADDING_BOTTOM }}>
                <Image source={avatarPlaceholder} style={styles.avatar} />
              </View>
            )}
            <View style={styles.avatarSpacer} />
          </React.Fragment>
        )}

        <View style={{ marginHorizontal: 10 }}>{this.renderMessageContent(message, isSelf)}</View>

        {isLatest && (
          <Text style={styles.messageTime}>{message.createdAt && moment(message.createdAt).format('HH:mm')}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageItem: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: MESSAGE_PADDING_BOTTOM,
    alignItems: 'flex-end',
  },
  selfMessageItem: {
    flexDirection: 'row-reverse',
  },
  firstItem: {
    paddingTop: MESSAGE_PADDING_BOTTOM,
  },
  userLatestMessageItem: {
    minHeight: 50,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginHorizontal: 10,
  },
  avatarSpacer: {
    width: 40,
    marginHorizontal: 5,
  },
  unsupportedMessage: {
    color: '#999',
    fontStyle: 'italic',
    marginHorizontal: 5,
  },
  messageTime: {
    color: '#bbb',
    fontSize: 10,
  },
});

export default MessageItem;
