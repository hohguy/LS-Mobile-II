import React from 'react';
import {
  View,
  Text,
  AsyncStorage,
  ListView,
} from 'react-native';
import axios from 'axios';

export default class ContentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
    };
  }

  static navigationOptions = {
    title: 'Content',
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      axios.get('https://mobile-server-ii.herokuapp.com/users', {
        headers: {
          authorization: token,
        }
      }).then((response) => {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          users: ds.cloneWithRows(response.data),
        });
      }).catch((error) => {
      });
    });
  }

  render() {
    if (this.state.users === null) return null;
    return (
      <View>
        <Text>List of all users:</Text>
        <ListView
          dataSource={this.state.users}
          renderRow={(user) => <Text>{user.email}</Text>}
        />
      </View>
    );
  }
}
