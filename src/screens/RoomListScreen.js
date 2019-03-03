import React from 'react';
import { FlatList, TouchableHighlight, View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { names } from '../constant';

const avatarPlaceholder = require('../assets/images/avatar.png');

class RoomListScreen extends React.Component {
  static navigationOptions = {
    title: 'Room List',
  };

  renderRoomItem = ({ item }) => (
    <TouchableHighlight
      onPress={() => this.props.navigation.navigate('Room', { name: item.name })}
      underlayColor="#f5f5f5"
    >
      <View style={styles.item}>
        <Image source={avatarPlaceholder} style={styles.avatar} />
        <View style={styles.body}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.latestMessage} numberOfLines={1}>
            {item.latestMessage}
          </Text>
        </View>
        <Icon name="chevron-right" size={24} color="#ccc" />
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <FlatList
        data={names.map(name => ({
          key: name,
          name,
          latestMessage:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, explicabo distinctio a recusandae dolorem totam eius ut! Nisi quia accusantium accusamus animi dolore, delectus ad impedit sed, autem provident blanditiis.',
        }))}
        renderItem={this.renderRoomItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#999',
    marginLeft: 16 + 48 + 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  avatar: {
    backgroundColor: '#eee',
    borderRadius: 24,
    width: 48,
    height: 48,
    marginRight: 16,
  },
  body: {
    flex: 1,
  },
  name: {
    marginBottom: 8,
  },
  latestMessage: {
    color: '#999',
  },
});

export default RoomListScreen;
