import React from 'react'
import { TouchableOpacity, Text, SafeAreaView, AsyncStorage, StyleSheet } from 'react-native'
import NavigationService from './NavigationService'

const DrawerContent = ({ navigation }) => {
  handleLogOut = async () => {
    await AsyncStorage.clear()
    NavigationService.navigate('Auth')
  }
  let nav = navigation.state.routes
  return (
    <SafeAreaView style={{ paddingVertical: 4 }}>
      {nav.map((route, i) => {
        if (navigation.state.index === i) { return }
        return (
          <TouchableOpacity
            key={i}
            onPress={() => navigation.navigate(route.routeName)}
            style={styles.button}
          >
            <Text style={styles.text}>{route.routeName}</Text>
          </TouchableOpacity>
        )
      })}
      <TouchableOpacity
        onPress={ () => handleLogOut()}
        style={styles.button}
      >
        <Text style={styles.text} >Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#929292',
    marginLeft: 10
  },
  button: {
    paddingHorizontal: 10,
    paddingTop: 10
  }
})

export default DrawerContent
