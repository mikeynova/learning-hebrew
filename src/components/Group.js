import React, { PureComponent } from 'react'
import { View, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native'

const { width } = Dimensions.get('screen')

export default class Group extends PureComponent {
  render () {
    const { groups, handlePress } = this.props
    return (
      <View style={styles.container}>
        {groups.map((group, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => handlePress(group)}
            style={styles.tile}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>{group.name}</Text>
            <Text>{`${group.lessons.length} Lessons`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tile: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
    height: width / 1.5,
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})
