import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.signIn = this.signIn.bind(this);
  }

  static navigationOptions = {
    title: 'Sign In',
  }

  signIn() {
    axios.post('https://mobile-server-ii.herokuapp.com/signin', {
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      if (response.data.code === 11000) {
        return this.setState({
          error: 'Email already taken',
        });
      }
      AsyncStorage.setItem('token', response.data.token).then(() => {
        this.props.navigation.navigate('Content');
      });
    }).catch((error) => {
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.error && this.state.error.length ? this.state.error : null}</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.textInput}
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            autoCapitalize='none'
            returnKeyType = 'next'
            autoFocus = {true}
            placeholder = 'Email'
            placeholderTextColor = '#000'
            keyboardType = 'email-address'
            />
          </View>

        <KeyboardAwareScrollView>
          <View style={styles.form}>
            <TextInput
              style={styles.textInput}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              autoCapitalize='none'
              returnKeyType = 'next'
              placeholder = 'Password'
              placeholderTextColor = '#000'
              secureTextEntry = {true}
              />
            </View>
          </KeyboardAwareScrollView>

        <Button
          title="Submit"
          onPress={this.signIn}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    margin: 10,
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
  },
  form: {
    padding: 5,
  },
});

export default SignInScreen;
