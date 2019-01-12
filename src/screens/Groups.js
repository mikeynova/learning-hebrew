import React, { PureComponent } from 'react'
import { View, Text, Button, AsyncStorage, StyleSheet, Image } from 'react-native'
import { Query } from 'react-apollo'
import gql from "graphql-tag"

import Group from '../components/Group'

class Groups extends PureComponent {
  handlePress = group => {
    this.props.navigation.navigate('Lessons', { group })
  }
  render () {
    return (
      <Query query={GroupsQuery}>
        {({ loading, error, data }) => {
          if (loading) return (
            <View style={styles.loading}>
              <Image style={{ height: 200, width: 200 }} source={{ uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/585d0331234507.564a1d239ac5e.gif' }} />
            </View>
          )
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
  loading: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center'
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
