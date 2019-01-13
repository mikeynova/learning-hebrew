import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, AsyncStorage, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Query } from 'react-apollo'
import gql from "graphql-tag"

export default class Lessons extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View>
        <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{navigation.state.params.group.name}</Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: '#f2f2f2'
    }
  })
  constructor(props) {
    super(props)
    this.state = {
      token: ''
    }
  }
  async componentDidMount () {
   const token = await AsyncStorage.getItem('userToken')
    this.setState({ token })
  }
  handlePress = lesson => {
    this.props.navigation.navigate('Lesson', { lesson, pageNumber: 1 })
  }
  render () {
    const { group } = this.props.navigation.state.params
    if (this.state.token == '') {
      return (
        <View style={styles.loading}>
          <Image
            style={{ height: 200, width: 200 }}
            source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif' }} />
        </View>
      )
    }
    return (
      <Query query={User} variables={{ token: this.state.token }}>
          {({ loading, error, data }) => {
            if (loading) return (
              <View style={styles.loading}>
                <Image
                  style={{ height: 200, width: 200 }}
                  source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif' }} />
              </View>
            )
            if (error) return <Text>{`Error: ${error}`}</Text>
            return (
              <SafeAreaView style={styles.container}>
                {group.lessons.map((lesson, i) => {
                  let name = null
                  if (data.user.completedLessons) {
                    const parsed = JSON.parse(data.user.completedLessons)
                    if (!parsed.indexOf(lesson.id)) {
                      name = 'check'
                    }
                  }
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
                        <Feather name={name} style={styles.icon}
                        />
                      </View>
                      <Text style={styles.text}>{lesson.name}</Text>
                    </TouchableOpacity>
                  )
                })}
            </SafeAreaView>
          )}}
          </Query>
    )
  }
}

const User = gql`
  query User($token: String!) {
    user(token: $token) {
      id
      name
      email
      facebookId
      completedLessons
    }
  }
`

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
  },
  loading: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
  }
})
