import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Controls from '../../components/controls/Controls'
import UserProfile from '../../components/profile/UserProfile.js'
import { CardContent, Grid } from '@mui/material'
import SimpleRecipe from '../../components/recipe/SimpleRecipe/index.js'
import Contexts from '../../contexts'
import UserServices from '../../services/userServices'
import UserErrorBox from '../../components/profile/UserErrorBox'

const index = () => {
  const [user, setUser] = useState(null)
  const params = useParams()
  const [showRecipes, setShowRecipes] = useState(false)
  const [follower, setFollower] = useState(false)

  const context = useContext(Contexts.UserContext)

  useEffect(() => {
    let mounted = true

    const fetchUser = async () => {
      const res = await UserServices.getUser(params.id)
      if (res.data !== null && res.status === 200 && mounted) {
        if (res.data.followers.some(follower => context.user?.user.following.some(f => f.toString() === follower.toString()))) {
          setFollower(true)
        } else {
          setFollower(false)
        }
        setUser(res.data)
      } else {
        setUser(false)
      }
    }
    fetchUser()

    return () => {
      mounted = false
    }

  }, [context])

  const message = () => {
    console.log('Sending message')
  }
  const recipes = () => {
    setShowRecipes(true)
  }
  const follow = async () => {
    const res = await UserServices.addFollow(user.id)
    if (res.status === 200) {
      // Update context users followers (this also causes follow button to change to unfollow)
      const prevUser = window.localStorage.getItem('userJson')
      const newUser = { ...JSON.parse(prevUser), user: (res.data.user) }
      window.localStorage.setItem('userJson', JSON.stringify(newUser))
      context.setUser(newUser)
    } else {
      // Todo: Add better error handling
      console.log('fail')
    }
  }
  const deleteFollow = async () => {
    const res = await UserServices.deleteFollow(user.id)
    if (res.status === 202) {
      // Update context users followers (this also causes unfollow button to change to follow)
      const prevUser = window.localStorage.getItem('userJson')
      const newUser = { ...JSON.parse(prevUser), user: (res.data.user) }
      window.localStorage.setItem('userJson', JSON.stringify(newUser))
      context.setUser(newUser)
    } else {
      // Todo: Add better error handling
      console.log('fail')
    }
  }

  return (
    <>
      {user === null ?  // user is null at start, render empty so "User not found" is not shown at load
        <> </>
        : user !== false ?
          <>
            <UserProfile user={user}>
              <Grid container flexWrap='nowrap' justifyContent={'center'}>
                <Grid item>
                  <CardContent>
                    <Controls.Button size='small' onClick={message} text='Message' disabled={context.user ? false : true} />
                  </CardContent>
                </Grid>
                <Grid item>
                  <CardContent>
                    <Controls.Button size='small' onClick={recipes} text='Recipes' disabled={user.recipes.length === 0} />
                  </CardContent>
                </Grid>
                <Grid item>
                  {!follower &&
                    <CardContent>
                      <Controls.Button size='small' onClick={follow} text='Follow' disabled={context.user ? false : true} />
                    </CardContent>
                  }
                  {follower &&
                    <CardContent>
                      <Controls.Button size='small' onClick={deleteFollow} text='Unfollow' disabled={context.user ? false : true} />
                    </CardContent>
                  }
                </Grid>
              </Grid>
            </UserProfile>
            {showRecipes &&
              <Grid container direction="column" flexWrap='nowrap' justifyContent={'center'}>
                {
                  user.recipes?.map(r => (
                    <Grid item key={r.id}>
                      <SimpleRecipe recipe={r}>
                        <Controls.Button size="small" text="Open" />
                      </SimpleRecipe>
                    </Grid>
                  ))
                }
              </Grid>
            }
          </>
          :
          <UserErrorBox message="User not found" />}
    </>
  )
}

export default index