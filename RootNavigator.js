import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation'

import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignIn from './screens/SignIn'
import SignUp from './screens/SignUp'
import LessonGroups from './screens/LessonGroups'
import Lessons from './screens/Lessons'

const AppStack = createStackNavigator({
  LessonGroups,
  Lessons
}, {
  initialRouteName: 'LessonGroups'
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
