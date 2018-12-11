import React, { PureComponent } from 'react'
import { View, TouchableWithoutFeedback, Text, Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('screen')

export default class LessonTiles extends PureComponent {
  render () {
    const { tiles, handlePress } = this.props
    return (
      <View style={{ flex: 1,  flexDirection: 'row', flexWrap: 'wrap' }}>
        {tiles.map((tile, i) => (
          <TouchableWithoutFeedback
            key={i}
            onPress={() => handlePress(tile)}
          >
            <View style={styles.tile}>
              <Text>{tile.title}</Text>
              <Text>{`${tile.lessons} Lessons`}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tile: {
    height: width / 2,
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#eaf1f4',
    borderWidth: 1,
    backgroundColor: '#eaf1f4'
  }
})
