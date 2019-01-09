import React, { PureComponent } from 'react'
import { View, Text, Button, AsyncStorage, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native'
import { Query } from 'react-apollo'
import { Audio } from 'expo'
import { Feather } from '@expo/vector-icons'
import gql from "graphql-tag"
const { width } = Dimensions.get('screen')

class Lesson extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View style={styles.headerContainer}>
        <Text>{navigation.state.params.lesson.name}</Text>
      </View>
    )
  })
  constructor (props) {
    super(props)
    this.playbackInstance = null
  }

  componentDidMount () {
    this._loadNewPlaybackInstance(false)
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync()
      this.playbackInstance.setOnPlaybackStatusUpdate(null)
      this.playbackInstance = null
    }

    const source = { uri: 'https://ia802508.us.archive.org/5/items/testmp3testfile/mpthreetest.mp3' }
    const initialStatus = {
      shouldPlay: playing,
    }

    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus,
      this.onPlaybackStatusUpdate
    )
    this.playbackInstance = sound
  }

  onPlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      this.playbackInstance.setPositionAsync(0)
    }
  }

  handlePress = (lesson, pageNumber) => {
    pageNumber += 1
    this.props.navigation.push('Lesson', { lesson, pageNumber })
  }

  handleEndLesson = () => {
    this.props.navigation.navigate('Groups')
  }

  handlePlay = () => {
    this.playbackInstance.playAsync()
  }

  render () {
    const { lesson, pageNumber } = this.props.navigation.state.params
    return (
      <Query query={PageQuery} variables={{ id: lesson.id, pageNumber }}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading</Text>
          if (error) return <Text>No pages for this lesson</Text>
          const parsed = JSON.parse(data.page.data)
          if (parsed.snippets) {
            const snippets = parsed.snippets
            return (
              <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'column' }}>
                  {snippets.map((snippet, i) => {
                    return (
                      <View key={i} style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', margin: 15 }}>
                        <Text>{snippet.english}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <TouchableOpacity style={{ marginRight: 5 }} onPress={() => this.handlePlay()}>
                            <Feather  name='play'  />
                          </TouchableOpacity>
                          <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 18 }}>{snippet.hebrew}</Text>
                            <Text style={{ fontSize: 10 }}>{snippet.phoenetics}</Text>
                          </View>
                        </View>
                      </View>
                    )
                  })}
                <SafeAreaView style={{ position: 'absolute', bottom: 0, }}>
                  <TouchableOpacity style={{ backgroundColor: 'red', width, height: 44, justifyContent: 'center' }} onPress={() => this.handleEndLesson()}>
                    <Text style={{ textAlign: 'center', color: '#fff' }}>Finish Lesson</Text>
                  </TouchableOpacity>
                </SafeAreaView>
              </View>
            )
          }
          return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View >
                <Text>{parsed.english || parsed.hebrew}</Text> 
              </View>
              <SafeAreaView style={{ position: 'absolute', bottom: 0, }}>
                <TouchableOpacity style={{  backgroundColor: 'red', width, height: 44, justifyContent: 'center' }} onPress={() => this.handlePress(lesson, pageNumber)}>
                  <Text style={{ textAlign: 'center', color: '#fff' }}>Continue</Text>
                </TouchableOpacity>
              </SafeAreaView>
            </View>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
})

const LessonQuery = gql`
  query LessonQuery($id: ID!) {
    lesson(id: $id) {
      name
      pages {
        id
        data
        pageNumber
      }
    }
  }
`
const PageQuery = gql`
  query PageQuery($id: ID!, $pageNumber: Int!) {
    page(id: $id, pageNumber: $pageNumber) {
      id
      pageNumber
      data
    }
  }
`

export default Lesson
