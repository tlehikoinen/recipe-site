import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Form } from '../../components/useForm'

import LoginServices from '../../services/loginServices'

import Controls from '../../components/controls/Controls'
import { Grid, Typography } from '@mui/material'

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
})

const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await LoginServices.login(values)
      if (res.status !== 200) {
        formik.setErrors( { password: 'Wrong email or password' })
      }
      else {
        alert(`Login successfull ${JSON.stringify(res.data, null, 2)}`)
      }
    },
  })


  return (

    <Form onSubmit={formik.handleSubmit}>
      <Grid container direction="column" justify='center' alignItems='center'>
        <Grid item>
          <Typography variant="h4">Login</Typography>
        </Grid>
        <Grid item>
          <Controls.Input
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email} />
        </Grid>
        <Grid>
          <Controls.Input
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item>
          <Controls.Button text="Login" type="submit" />
        </Grid>
      </Grid>
    </Form>


  )
}

export default LoginForm