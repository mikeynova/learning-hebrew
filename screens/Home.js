import React, { PureComponent } from 'react'
import { View, Text, Button, AsyncStorage } from 'react-native'

export default class Home extends PureComponent {
  render () {
    return (
      <View style={{ flex: 1, backgroundColor: 'yellow' }}>
        <Text>Home</Text>
        <Button
          onPress={() => this._signOut()}
          title={'Sign Out'}
        />
      </View>
    )
  }

  _signOut = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }
}
