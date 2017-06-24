import Expo from 'expo';
import React from 'react';
import {
  View,
  AsyncStorage,
  Button,
  StyleSheet,
} from 'react-native';
import SignUpScreen from './SignUp';
import SignInScreen from './SignIn';
import ContentScreen from './Content';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Main',
  }

  componentWillMount() {
    AsyncStorage.getItem('token').then((token) => {
      this.props.navigation.navigate('Content');
    });
  }

  render() {
    return (
      <View style={styles.container}>

      <Button
        onPress={() => this.props.navigation.navigate('SignIn')}
        title="Sign In"
        accessibilityLabel="Sign in to access content"
        />

      <Button
        onPress={() => this.props.navigation.navigate('SignUp')}
        title="Sign Up"
        accessibilityLabel="Sign up for authorization"
        />

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

const App = StackNavigator({
  Home: { screen: HomeScreen },
  SignUp: { screen: SignUpScreen },
  SignIn: { screen: SignInScreen },
  Content: { screen: ContentScreen },
});

Expo.registerRootComponent(App);
