import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('screen')

export default class Group extends PureComponent {
  render () {
    const { groups, handlePress } = this.props
    return (
      <View style={{ flex: 1,  flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center' }}>
        {groups.map((group, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handlePress(group)}
            style={styles.tile}
          >
            <Text>{group.name}</Text>
            <Text>{`${group.lessons.length} Lessons`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  tile: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
    height: width / 2,
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  }
})
