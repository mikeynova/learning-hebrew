import React, { PureComponent } from 'react'
import { View, Text } from 'react-native'

export default class Lessons extends PureComponent {
  render () {
    const { lesson } = this.props.navigation.state.params
    return (
      <View>
        <Text>{lesson.title}</Text>
      </View>
    )
  }
}
