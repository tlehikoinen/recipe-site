import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import useStyles from './styles'
import { Grid } from '@mui/material'
import BackToTop from '../../components/BackToTop'
import SimpleRecipe from '../../components/recipe/SimpleRecipe'
import SearchBox from '../../components/SearchBox'
import Select from '../../components/controls/Select'
import RadioGroup from '../../components/controls/RadioGroup'
import { useForm } from '../../components/useForm'
import Contexts from '../../contexts'
import Controls from '../../components/controls/Controls'
import NewRecipe from '../../components/recipe/NewRecipe'

// A custom hook that builds on useLocation to parse
// the query string for you.
const useQuery = () => {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}
const filterOptions = [
  { id: 1, title: 'Followed' },
  { id: 2, title: 'Most likes' },
]
const radioOptions = [
  { id: 1, title: 'Savory' },
  { id: 2, title: 'Vegetarian' },
  { id: 3, title: 'Sweet' }
]

const index = () => {

  const classes = useStyles()
  const [filteredRecipes, setFilteredRecipes] = useState(null)
  const [addNew, setAddNew] = useState(false)
  const userCtx = useContext(Contexts.UserContext)
  const recipeCtx = useContext(Contexts.RecipeContext)

  const { values, setValues, handleInputChange } = useForm({
    filter: '',
    searchText: '',
    radioSelection: ''
  })

  let query = useQuery()

  useEffect(() => {
    setFilteredRecipes(recipeCtx.recipes)
    const scrollPosition = sessionStorage.getItem('scrollPositionRecipes')
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition))
      sessionStorage.removeItem('scrollPositionRecipes')
    }
    const queryRes = query.get('user')
    if (queryRes) {
      setValues({ ...values, ['searchText']: `user::${queryRes}` })
    }
  }, [recipeCtx])


  useEffect(() => {
    if (values.searchText.startsWith('user::')) {
      const result = recipeCtx.recipes?.filter(r => {
        return r.user?.username.toLowerCase() === values.searchText.substring(6)
          && (r.course.toLowerCase() === values.radioSelection.toLowerCase() || values.radioSelection === '')
      })

      // TODO: Filter drop down selections (following, most likes etc...)
      setFilteredRecipes(result)

    } else {
      const result = recipeCtx.recipes?.filter(r => {
        return r.title.toLowerCase().includes(values.searchText.toLowerCase())
          && (r.course.toLowerCase() === values.radioSelection.toLowerCase() || values.radioSelection === '')
      })

      // TODO: Filter drop down selections (following, most likes etc...)
      setFilteredRecipes(result)
    }
  }, [values])



  const handleClick = () => {
    sessionStorage.setItem('scrollPositionRecipes', window.pageYOffset)
  }

  const toggleAddNew = () => {
    setAddNew(!addNew)
  }

  return (
    <Grid container className={classes.root}>
      { !addNew && <Grid className={classes.searchBox}>
        <Grid sx={{ display: 'flex', justifyContent: 'center' }} container direction="row">
          <Grid item>
            <Grid container>
              <SearchBox
                label="Search"
                name="searchText"
                placeholder="Search recipes"
                onChange={handleInputChange}
                value={values.searchText} />
              {userCtx.user &&
              <Select
                name='filter'
                label='Filter'
                value={values.filter}
                onChange={handleInputChange}
                options={filterOptions} />}
            </Grid>
          </Grid>
          <Grid item sx={{ minWidth: '340px' }}>
            <RadioGroup
              onChange={handleInputChange}
              name="radioSelection"
              value={values.radioSelection}
              items={radioOptions} />
          </Grid>
        </Grid>
      </Grid> }
      <Grid item xs={!addNew ? 12 : 0} className={classes.newRecipe}>
        {addNew ?
          userCtx.user && <NewRecipe close={toggleAddNew}/>
          :
          userCtx.user && <Controls.Button xs={12} sx={{ margin: '1.5em 0 0 2em' }} onClick={toggleAddNew} size="small" text="Add new" />
        }
      </Grid>
      { !addNew &&
        filteredRecipes?.map(r => (
          <Grid item key={r.id} xs={12} md={6} xl={4} align="center" onClick={handleClick}>
            <SimpleRecipe recipe={r} />
          </Grid>
        ))
      }
      {!addNew && <BackToTop />}
    </Grid>
  )
}

export default index