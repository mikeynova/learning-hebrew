import React, { PureComponent } from 'react'
import { View, Text, Alert, AsyncStorage, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import config from '../lib/config'
import FacebookButton from '../components/FacebookButton'
import Form from '../components/Form'
import { Query, graphql, Mutation, compose } from 'react-apollo'
import gql from "graphql-tag"
import SignUpButton from '../components/SignUpButton'

class SignUp extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Bible Hebrew</Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: '#f2f2f2'
    }
  })
  render () {
    return (
      <View style={styles.container}>
        <Form
          auth={this.props.signup}
          inputs={[
            { name: 'email', label: 'Email', type: 'email'},
            { name: 'password', label: 'Password', type: 'password'},
            { name: 'name', label: 'Name', type: 'name'}
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
        Alert.alert('Unable to sign up using Facebook')
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }
}

const SignUpQuery = gql`
  mutation SignUp($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
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

const SignUpWrapper = compose(
  graphql(SignUpQuery, {
    props: ({ mutate }) => ({
      signup: (email, password, name) => mutate({ variables: { email, password, name } })
    })
  }),
  graphql(FacebookSignin, {
    props: ({ mutate }) => ({
      fbAuth: (facebookId, name) => mutate({ variables: { facebookId, name } })
    })
  })
)(SignUp)

export default SignUpWrapper

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})
