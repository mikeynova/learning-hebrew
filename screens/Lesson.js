import React, { PureComponent } from 'react'
import { View, Text, Button, AsyncStorage, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import gql from "graphql-tag"

class Lesson extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View style={styles.headerContainer}>
        <Text>{navigation.state.params.lesson.name}</Text>
      </View>
    )
  })

  render () {
    const { id } = this.props.navigation.state.params.lesson
    return (
      <Query query={LessonQuery} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading</Text>
          if (error) return <Text>{`Error!: ${error}`}</Text>
          return (
            <Text>Hey</Text>
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

export default Lesson
