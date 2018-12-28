import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import Groups from './screens/Groups'
import Lessons from './screens/Lessons'
import Lesson from './screens/Lesson'

const AppStack = createStackNavigator({
  Groups,
  Lessons,
  Lesson
}, {
  initialRouteName: 'Groups'
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
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
))
