import React, { PureComponent } from 'react'
import { View, Text, Alert, AsyncStorage, StyleSheet, TouchableWithoutFeedback, Button } from 'react-native'
import { Query, graphql, Mutation, compose } from 'react-apollo'
import gql from "graphql-tag"
import axios from 'axios'
import { print } from 'graphql'

import config from '../lib/config'
import FacebookButton from '../components/FacebookButton'
import Form from '../components/Form'

const GET_FEED = gql`
  {
    feed {
      id
    }
  }
`;

class SignIn extends PureComponent {
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
          ]}
        />
        <FacebookButton login={this._logIn}/>
        <View style={{ flexDirection: 'row' }}>
          <Text>
            Don't have an account?
          </Text>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            <Text>
              Sign Up
            </Text>
          </TouchableWithoutFeedback>
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
        // Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        const response = await request.json()

        this.props
          .fbAuth(response.id, response.name)
          .then(async ({ data }) => {
            await AsyncStorage.setItem('userToken', data.fbAuth.token)
            this.props.navigation.navigate('App')
          })
          .catch(err => console.log(err))
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

const ListingsQueuy = gql`
  query {
    feed {
      id
      url
      description
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
  graphql(ListingsQueuy, { name: 'listingsQuery' }),
  graphql(FacebookSignin, {
    props: ({ mutate }) => ({
      fbAuth: (facebookId, name) => mutate({ variables: { facebookId, name } })
    })
  })
)(SignIn)

export default SignInWrapper
