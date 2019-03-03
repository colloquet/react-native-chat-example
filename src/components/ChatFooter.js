import React from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import * as util from '../util';
import { IPHONE_X_BOTTOM_PADDING } from '../constant';

const FOOTER_BOTTOM_PADDING = util.isIphoneX() ? IPHONE_X_BOTTOM_PADDING : 0;

class ChatFooter extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onShowActions: PropTypes.func.isRequired,
  };

  state = {
    text: '',
  };

  handleSubmit = () => {
    if (!this.state.text.trim()) return;

    this.props.onSubmit(this.state.text.trim());
    this.setState({ text: '' });
  };

  render() {
    const { text } = this.state;
    const { onShowActions, onSubmitFake } = this.props;
    const submitDisabled = !text.trim();

    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton} onPress={onShowActions}>
          <Icon name="plus" size={28} color="#000" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={text}
          onChangeText={value => this.setState({ text: value })}
          returnKeyType="send"
          blurOnSubmit={false}
          onSubmitEditing={this.handleSubmit}
          placeholder="Message"
        />

        <TouchableOpacity style={styles.submitButton} onPress={this.handleSubmit} disabled={submitDisabled}>
          <Icon name="send" size={28} color={submitDisabled ? '#999' : '#000'} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionButton: {
    paddingHorizontal: 16,
    marginLeft: -10,
  },
  submitButton: {
    paddingHorizontal: 16,
    marginRight: -10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 10 + FOOTER_BOTTOM_PADDING,
  },
});

export default ChatFooter;
