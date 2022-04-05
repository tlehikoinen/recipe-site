import { Card,  CardContent, Grid } from '@mui/material'
import React, { useContext } from 'react'
import RadioGroup from '../../components/controls/RadioGroup'
import useStyles from './styles'
import Contexts from '../../contexts'
import userServices from '../../services/userServices'

const themeOptions = {
  light: 'Light theme',
  dark: 'Dark theme'
}

/*
Toggles theme in context.
Context change for theme forces re-render, default value for radiogroup is got straight from it
On re-render it value automatically changes. RadioGroup state is not tracked elsewhere.
*/

const index = () => {
  //const context = useContext(Contexts.UserContext)
  const infoCtx = useContext(Contexts.PageInfoContext)
  const userCtx = useContext(Contexts.UserContext)
  const classes = useStyles()

  const themeChange = (e) => {
    const { value } = e.target

    if (value === themeOptions[infoCtx?.theme]) {   // If theme equals clicked, return
      return
    }
    else {
      const updatedTheme = Object.keys(themeOptions).filter(k => {return themeOptions[k] === value})[0]  // updatedTheme is the key from themeOptions
      window.localStorage.setItem('theme', updatedTheme)
      infoCtx.changeTheme(updatedTheme)
      if (userCtx.user) {
        updateThemeInDb(updatedTheme)
      }
    }
  }

  const updateThemeInDb = async (theme) => {
    await userServices.updateTheme(userCtx.user.user.id, theme)
  }

  return (
    <Grid container className={classes.root}>
      <Card>
        <CardContent>
          <RadioGroup
            label='Theme'
            name='radioTheme'
            onChange={themeChange}
            value={themeOptions[infoCtx?.theme] || themeOptions.light}
            items={[{ title: 'Dark theme' }, { title: 'Light theme' }]} />

        </CardContent>
      </Card>
    </Grid>
  )
}

export default index