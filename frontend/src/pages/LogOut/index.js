import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import Contexts from '../../contexts'



const index = () => {
  const history = useNavigate()
  const [timeDelay, setTimeDelay] = useState(3)
  const { setUser } = useContext(Contexts.UserContext)

  useEffect(() => {
    const timer = setTimeout(() => setTimeDelay(timeDelay-1), 1000)

    if (timeDelay === 0) {
      history('/home')
    }

    return () => {
      clearTimeout(timer)
    }
  }, [timeDelay])

  useEffect(() => {
    window.localStorage.removeItem('userJson')
    setUser(null)
  }, [])

  return (
    <Grid
      container
      spacing={0}
      marginTop={4}
      direction="column"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >

      <Grid item xs={3}>
        <Typography variant="h4">Logged out successfully</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography variant="subtitle">Redirecting in {timeDelay} seconds</Typography>
      </Grid>
      {/* <Grid item xs={3}>
        <img
          height="400"
          width="400"
          src={'https://evidensia.fi/wp-content/uploads/2020/06/kissa-kesa%CC%88-evidensia-scaled.jpg'}
          alt="loading...">
        </img>
      </Grid> */}
    </Grid>
  )
}

export default index