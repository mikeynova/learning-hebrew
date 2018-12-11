import React, { PureComponent } from 'react'
import { View, Text, Button, AsyncStorage, Dimensions } from 'react-native'

import LessonTiles from '../components/LessonTiles'
const { width, height } = Dimensions.get('screen')

export default class LessonGroups extends PureComponent {
  handlePress = lesson => {
    this.props.navigation.navigate('Lessons', { lesson })
  }
  render () {
    const tiles = [{ title: 'Commandments', lessons: 10 },
    { title: 'Prophets', lessons: 20 },
    { title: 'Israel', lessons: 19 },
    { title: 'Sports', lessons: 8 },
    { title: 'Family', lessons: 16 },
    { title: 'Military', lessons: 15 }]
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: height - width * 2, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>Lesson Groups</Text>
        </View>
        <LessonTiles tiles={tiles} handlePress={this.handlePress} />
      </View>
    )
  }

  _signOut = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }
}
