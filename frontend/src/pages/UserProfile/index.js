import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Controls from '../../components/controls/Controls'
import UserProfile from '../../components/profile/UserProfile.js'
import { CardContent, Grid } from '@mui/material'
import Contexts from '../../contexts'
import UserServices from '../../services/userServices'
import UserErrorBox from '../../components/profile/UserErrorBox'
// import { useDialog } from '../../components/useDialog'
// import CommentDialog from '../Recipe/CommentDialog'
// import { useForm } from '../../components/useForm'

const index = () => {
  const [user, setUser] = useState(null)
  const params = useParams()
  const [follower, setFollower] = useState(false)

  // const messageDialog = useDialog()
  // const [messageDialogError, setMessageDialogError] = useState(false)
  // const { values, handleInputChange } = useForm()
  // const handleMessageDialogChange = (e) => {
  //   setMessageDialogError(false)
  //   handleInputChange(e)
  // }

  const context = useContext(Contexts.UserContext)
  const recipeCtx = useContext(Contexts.RecipeContext)
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

  // const sendMessage = async () => {
  //   console.log('Sending message')
  //   // CommentDialog input field has name 'comment'
  //   if (!values?.comment) {
  //     setMessageDialogError('Empty message')
  //     return
  //   }
  //   const comment = values.comment
  //   await UserServices.postMessage(user.id, comment)
  // }

  const follow = async () => {
    const res = await UserServices.addFollow(user.id)
    if (res.status === 200) {
      // Update users for recipes and their followers, so user sees recipes from followed before refresh
      const newRecipes = recipeCtx.recipes
        .map(r => r?.user?.id === user?.id ? { ...r, user: { ...r.user, followers: r.user.followers.concat(res.data.follow.id) } } : r)

      recipeCtx.setRecipes(newRecipes)

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
                {/* <Grid item>
                  <CardContent>
                    <Controls.Button size='small' onClick={messageDialog.handleOpen} text='Message' disabled={context.user ? false : true} />
                  </CardContent>
                </Grid> */}
                <Grid item>
                  <CardContent>
                    <Controls.Button size='small' text='Recipes' disabled={user.recipes.length === 0} component={Link} to={`/recipes/?user=${user.username}`} />
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

            {/* <CommentDialog
              open={messageDialog.open}
              values={values}
              handleInputChange={handleMessageDialogChange}
              handleClose={messageDialog.handleClose}
              commentDialogError={messageDialogError}
              action={sendMessage}
              title='Send message'
              submitBtnText='Send' /> */}
          </>
          :
          <UserErrorBox message="User not found" />}
    </>
  )
}

export default index