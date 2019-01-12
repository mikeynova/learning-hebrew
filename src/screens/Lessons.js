import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default class Lessons extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View>
        <Text>{navigation.state.params.group.name}</Text>
      </View>
    )
  })
  handlePress = lesson => {
    this.props.navigation.navigate('Lesson', { lesson, pageNumber: 1 })
  }
  render () {
    const { group } = this.props.navigation.state.params
    return (
      <SafeAreaView style={styles.container}>
        {group.lessons.map((lesson, i) => {
          let border = {
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: '#bbb'
          }
          if (i === 0) {
            border.borderTopWidth = 0
          }
          return (
            <TouchableOpacity
              key={lesson.id}
              style={[styles.lesson, border]}
              onPress={() => this.handlePress(lesson)}
            >
              <View style={styles.iconContainer}>
                <Feather name="check" style={styles.icon}
                />
              </View>
              <Text style={styles.text}>{lesson.name}</Text>
            </TouchableOpacity>
          )
        })}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  lesson: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#bbb'
  },
  text: {
    fontSize: 18
  },
  iconContainer: {
    height: 50,
    width: 50,
    margin: 15,
    justifyContent: 'center'
  },
  icon: {
    fontSize: 34,
    textAlign: 'center'
  }
})
