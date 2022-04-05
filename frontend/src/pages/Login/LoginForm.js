import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { Form } from '../../components/useForm'

import UserServices from '../../services/userServices'
import RecipeServices from '../../services/recipeServices'
import Contexts from '../../contexts'

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

  const { setUser } = useContext(Contexts.UserContext)
  const { changeTheme } = useContext(Contexts.PageInfoContext)
  const history = useNavigate()

  const handleLogin = (data) => {
    window.localStorage.setItem('userJson', JSON.stringify(data))
    UserServices.setToken(data.token)
    RecipeServices.setToken(data.token)
    changeTheme(data.user.theme)
    setUser(data)
    history('/')
  }
  const formik = useFormik({
    initialValues: {
      email: 'akuankka@gmail.com',
      password: 'salasana',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await UserServices.login(values)
      if (res.status !== 200) {
        formik.setErrors( { password: 'Wrong email or password' })
      }
      else {
        handleLogin(res.data)
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