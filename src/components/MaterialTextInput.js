import React, { PureComponent } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { TextField } from 'react-native-material-textfield'

const { width } = Dimensions.get('screen')

export default class MaterialTextInput extends PureComponent {
  render() {
    const { error, touched, handleChange, name, type, ...props } = this.props
    const displayError = !!error[name] && touched[name]
    const errorColor = 'rgb(239, 51, 64)'
    return (
      <View>
        <TextField
          secureTextEntry={type === 'password'}
          labelHeight={12}
          baseColor={displayError ? errorColor : '#1976D2'}
          tintColor="#2196F3"
          textColor="#212121"
          onBlur={props.handleBlur(name)}
          onChangeText={handleChange(name)}
          {...props}
        />
        <Text
          style={{
            textAlign: 'left',
            color: displayError ? errorColor : 'transparent',
            height: 20,
            width: width * 0.75
          }}
        >
          {error[name]}
        </Text>
      </View>
    );
  }
}
