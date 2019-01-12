import React, { PureComponent } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  View,
  Image
} from 'react-native'

export default class AuthLoadingScreen extends PureComponent {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    this.props.navigation.navigate(userToken ? 'App' : 'Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ height: 200, width: 200 }}
          source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif' }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  }
})
