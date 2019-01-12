import React, { Component } from 'react'
import { Button, View, Alert, AsyncStorage } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import MaterialTextInput from './MaterialTextInput'
import NavigationService from '../NavigationService'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('please! email?')
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(2, 'pretty sure this will be hacked'),
});

class Form extends Component {
  render () {
    return (
      <Formik
        onSubmit={({ email, password, name }) => {
          this.props.auth(email, password, name)
            .then(async ({ data }) => {
              const user = data.signup ? data.signup : data.login
              await AsyncStorage.setItem('userToken', user.token)
              NavigationService.navigate('App')
            })
            .catch(({ message }) => { Alert.alert(message) })
        }}
        initialValues={{
          email: '',
          password: '',
          name: ''
        }}
        validationSchema={validationSchema}
        validateOnChange={true}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => {
          return (
            <View>
              {this.props.inputs.map((input, i) => (
                <MaterialTextInput
                  key={i}
                  touched={touched}
                  handleBlur={handleBlur}
                  error={errors}
                  handleChange={handleChange}
                  label={input.label}
                  name={input.name}
                  type={input.type}
                />
              ))}
              <Button onPress={handleSubmit} title="SUBMIT" />
            </View>
          )}}
      </Formik>
    )
  }
}

export default Form
