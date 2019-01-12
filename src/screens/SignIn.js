import React, { PureComponent } from 'react'
import { View, Text, Alert, AsyncStorage, StyleSheet } from 'react-native'
import { graphql, compose } from 'react-apollo'
import gql from "graphql-tag"

import SignUpButton from '../components/SignUpButton'
import config from '../lib/config'
import FacebookButton from '../components/FacebookButton'
import Form from '../components/Form'

class SignIn extends PureComponent {
  handlePress = () => {
    this.props.navigation.navigate('SignUp')
  }
  render () {
    return (
      <View style={styles.container}>
        <Text>
          Bible Hebrew
        </Text>
        <Form
          auth={this.props.login}
          inputs={[
            { name: 'email', label: 'Email', type: 'email'},
            { name: 'password', label: 'Password', type: 'password'},
          ]}
        />
        <View style={{ flexDirection: 'column' }}>
          <Text style={{ textAlign: 'center' }}>
            Don't have an account?
          </Text>
          <SignUpButton press={() => this.handlePress()}/>
          <Text style={{ textAlign: 'center' }}>Or</Text>
          <FacebookButton login={this._logIn}/>
        </View>
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
      } = await Expo.Facebook.logInWithReadPermissionsAsync(config.fbKey, {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const request = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
        const response = await request.json()

        this.props
          .fbAuth(response.id, response.name)
          .then(async ({ data }) => {
            await AsyncStorage.setItem('userToken', data.fbAuth.token)
            this.props.navigation.navigate('App')
          })
          .catch(err => console.log(err))
      } else {
        Alert.alert('Unable to login using Facebook')
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

const SignInQuery = gql`
  mutation SignIn($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
      token
    }
  }
`

const FacebookSignin = gql`
  mutation FacebookSignin($facebookId: String!, $name: String!) {
    fbAuth(facebookId: $facebookId, name: $name) {
      user {
        id
      }
      token
    }
  }
`

const SignInWrapper = compose(
  graphql(FacebookSignin, {
    props: ({ mutate }) => ({
      fbAuth: (facebookId, name) => mutate({ variables: { facebookId, name } })
    })
  }),
  graphql(SignInQuery, {
    props: ({ mutate }) => ({
      login: (email, password) => mutate({ variables: { email, password } })
    })
  })
)(SignIn)

export default SignInWrapper
