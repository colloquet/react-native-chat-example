import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import ParsedText from 'react-native-parsed-text';
import PropTypes from 'prop-types';

class MessageText extends React.PureComponent {
  static propTypes = {
    message: PropTypes.object.isRequired,
    isSelf: PropTypes.bool.isRequired,
  };

  handleUrlPress = url => {
    let openURL = url;
    if (url.indexOf('https://') !== 0 && url.indexOf('http://') !== 0) {
      openURL = `https://${url}`;
    }
    openURL = openURL.replace(/^http:\/\//i, 'https://');
    Linking.openURL(openURL);
  };

  handleEmailPress = email => {
    let openEmail = email;
    if (email.indexOf('mailto:') !== 0) {
      openEmail = `mailto:${email}`;
    }
    Linking.openURL(openEmail);
  };

  handlePhonePress = number => {
    let openNumber = number;
    if (number.indexOf('tel:') !== 0) {
      openNumber = `tel:${number}`;
    }
    Linking.openURL(openNumber);
  };

  render() {
    const { message, isSelf } = this.props;

    return (
      <View style={[styles.messageContainer, isSelf && styles.selfMessageContainer]}>
        <ParsedText
          style={[styles.messageText, isSelf && styles.selfMessageText]}
          parse={[
            { type: 'url', style: styles.url, onPress: this.handleUrlPress },
            { type: 'phone', style: styles.phone, onPress: this.handlePhonePress },
            { type: 'email', style: styles.email, onPress: this.handleEmailPress },
          ]}
          selectable
        >
          {message.text}
        </ParsedText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  messageContainer: {
    padding: 5,
    backgroundColor: '#eee',
    borderRadius: 16,
    maxWidth: 200,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selfMessageContainer: {
    backgroundColor: '#0076FF',
  },
  messageText: {
    marginHorizontal: 5,
    fontSize: 16,
  },
  selfMessageText: {
    color: '#fff',
  },
  url: {
    textDecorationLine: 'underline',
  },
  email: {
    textDecorationLine: 'underline',
  },
  phone: {
    textDecorationLine: 'underline',
  },
});

export default MessageText;
