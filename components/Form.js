import React from 'react'
import { Button, View } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import MaterialTextInput from './MaterialTextInput'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('please! email?')
    .email("well that's not an email"),
  password: Yup.string()
    .required()
    .min(2, 'pretty sure this will be hacked'),
});

const Form = props => (
  <Formik
    onSubmit={values => console.log(values)}
    initialValues={{
      email: '',
      password: '',
      firstName: '',
      lastName: ''
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
          {props.inputs.map((input, i) => (
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

export default Form
