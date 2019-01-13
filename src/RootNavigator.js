import { createSwitchNavigator, createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import React from 'react'
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import Groups from './screens/Groups'
import Lessons from './screens/Lessons'
import Lesson from './screens/Lesson'
import Profile from './screens/Profile'
import DrawerContent from './DrawerContent'

const DrawerStack = createDrawerNavigator({
  Groups,
  Profile
}, {
  initialRouteName: 'Groups',
  navigationOptions: ({ navigation }) => ({
    headerTitle: (
      <View style={styles.headerContainer} >
        <TouchableOpacity 
          style={styles.hamburger}
          onPress={() => navigation.toggleDrawer()}
        >
          <Feather style={{ fontSize: 28 }} name='menu'/>
        </TouchableOpacity>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Bible Hebrew</Text>
      </View>
    ),
    headerStyle: {
      backgroundColor: '#f2f2f2'
    }
  }),
  contentComponent: ({ navigation }) => {
    return <DrawerContent navigation={navigation} />
  }
})

const AppStack = createStackNavigator({
  DrawerStack,
  Lessons,
  Lesson
}, {
  initialRouteName: 'DrawerStack'
})

const AuthStack = createStackNavigator({
  SignIn,
  SignUp
}, {
  initialRouteName: 'SignIn'
})

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack
  }, {
    initialRouteName: 'AuthLoading'
}))

const styles = StyleSheet.create({
  headerContainer: {
    marginLeft: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  hamburger: {
    position: 'absolute',
    left: 0
  }
})
