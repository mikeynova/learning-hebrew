import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
const iconName = 'facebook'

export default FaceBookSignInButton = (props) => (
  <TouchableHighlight
    underlayColor='#99d9f4'
    onPress={() => props.login()}>
    <View style={styles.buttonContainer}>
      <Icon name={iconName} color='white' size={25} />
      <Text style={styles.btnText}>Continue with Facebook</Text>
    </View>
  </TouchableHighlight>
)

const backgroundColor = '#3b5998'
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor,
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 5,
    justifyContent: 'center'
  },
  buttonContainerSmall: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 5,
    width: 48,
    height: 48,
  },
  btnText: {
    fontSize: 18,
    color: '#FAFAFA',
    marginLeft: 10,
    marginTop: 2,
  }
})
