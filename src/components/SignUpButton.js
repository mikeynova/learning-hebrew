import React from 'react'
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native'

export default SignUpButton = (props) => (
  <TouchableHighlight
    onPress={() => props.press()}>
    <View style={styles.buttonContainer}>
      <Text style={styles.btnText}>Sign Up</Text>
    </View>
  </TouchableHighlight>
)

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 5,
    justifyContent: 'center'
  },
  btnText: {
    fontSize: 18,
    color: '#fafafa',
    marginLeft: 10,
    marginTop: 2,
  }
})
