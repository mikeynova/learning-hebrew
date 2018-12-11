import React, { PureComponent } from 'react'
import { View, Text, Alert, AsyncStorage, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import config from '../lib/config'
import FacebookButton from '../components/FacebookButton'
import Form from '../components/Form'

export default class SignUp extends PureComponent {
  render () {
    return (
      <View style={styles.container}>
        <Text>
          Bible Hebrew
        </Text>
        <Form
          inputs={[
            { name: 'email', label: 'Email', type: 'email'},
            { name: 'password', label: 'Password', type: 'password'},
            { name: 'fistName', label: 'First Name', type: 'name'},
            { name: 'lastName', label: 'Last Name', type: 'name'}
          ]}
        />
        <FacebookButton login={this._logIn}/>
      </View>
    )
  }

  _logIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Expo.Facebook.logInWithReadPermissionsAsync(config.Auth.FB, {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        await AsyncStorage.setItem('userToken', token);
        // console.log('this.props.navigation', this.props.navigation)
        this.props.navigation.navigate('App');
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
