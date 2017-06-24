import Expo from 'expo';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  AsyncStorage,
  ScrollView
} from 'react-native';
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.signUp = this.signUp.bind(this);
  }

  static navigationOptions = {
    title: 'Sign Up',
  }

  signUp() {
    axios.post('https://mobile-server-ii.herokuapp.com/users', {
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

        <ScrollView scrollEnabled={false}>
          <View style={styles.form}>
            <TextInput
              style={styles.textInput}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              autoCapitalize='none'
              // returnKeyType = 'return'
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
              returnKeyType = 'done'
              placeholder = 'Password'
              placeholderTextColor = '#000'
              onSubmitEditing={ () => this.signUp }
            />
          </View>
          </KeyboardAwareScrollView>

          <Button
            title="Submit"
            onPress={this.signUp}
          />
        </ScrollView>
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
    borderColor: 'grey',
    borderWidth: 2,
  },
  form: {
    padding: 10,
  },
});

export default SignUpScreen;
