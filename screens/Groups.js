import React, { PureComponent } from 'react'
import { View, Text, Button, AsyncStorage, StyleSheet } from 'react-native'
import { Query } from 'react-apollo'
import gql from "graphql-tag"

import Group from '../components/Group'

class Groups extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: (
      <View style={styles.headerContainer}>
        <View style={styles.logOutBtn}>
          <Button
            title="Log out"
            onPress={async () => {
              await AsyncStorage.clear()
              navigation.navigate('Auth')
            }}
          />
        </View>
        <Text>Lesson Groups</Text>
      </View>
    )
  })
  handlePress = group => {
    this.props.navigation.navigate('Lessons', { group })
  }
  render () {
    return (
      <Query query={GroupsQuery}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading</Text>
          if (error) return <Text>{`Error! ${error.message}`}</Text>
          return <Group groups={data.groups} handlePress={this.handlePress} />
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
  },
  logOutBtn: {
    position: 'absolute',
    left: 0
  }
})

const GroupsQuery = gql`
  query {
    groups {
      id
      name
      lessons {
        id
        name
      }
    }
  }
`

export default Groups
