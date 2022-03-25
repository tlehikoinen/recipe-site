import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useFormik } from 'formik'
import * as yup from 'yup'
import UserServices from '../../services/userServices'
import { Form } from '../../components/useForm'
import Controls from '../../components/controls/Controls'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  username: yup
    .string('Enter your username')
    .lowercase()
    .min(4, 'Username should have 4-16 characters')
    .max(16, 'Username should have 4-16 characters')
    .required('Username is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
})

const generateFieldErrorMessage = (error) => {
  if (error.includes('11000')) {
    if (error.includes('email_1')) {
      return { field: 'email', message: 'Email already exists' }
    }
    else if (error.includes('username_1')) {
      return { field: 'username', message: 'Username already exists' }
    }
  }
  else {
    if (error.includes('email')) {
      return { field: 'email', message: 'Email not accepted' }
    }
    else if (error.includes('username')) {
      return { field: 'username', message: 'Username not accepted' }
    }
    else if (error.includes('Password')) {
      return { field: 'password', message: 'Password should be of minimum 8 characters length' }
    }
  }
}

const SignUpForm = () => {

  const formik = useFormik({
    initialValues: {
      email: 'akuankka@gmail.com',
      username: 'tomppa',
      password: 'salasana'
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await UserServices.signUp(values)
      if (res.status !== 201) {
        const { field, message } = generateFieldErrorMessage(res.data.error)
        formik.setErrors({ [field]: message } )
      }
      else {
        alert(`User created successfully ${JSON.stringify(res.data, null, 2)}`)
      }
    },
  })
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Grid container direction="column" justify='center' alignItems='center'>
        <Grid item>
          <Typography variant="h4">Create account</Typography>
        </Grid>
        <Grid item>
          <Controls.Input
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email} />
        </Grid>

        <Grid item>
          <Controls.Input
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username} />
        </Grid>
        <Grid item>
          <Controls.Input
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password} />
        </Grid>
        <Grid item>
          <Controls.Button text="Create" type="submit" size="small" />
        </Grid>
      </Grid>

    </Form>




  )
}

export default SignUpForm