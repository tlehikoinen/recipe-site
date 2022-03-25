import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import useStyles from './styles'
import { Grid } from '@mui/material'
import BackToTop from '../../components/BackToTop'
import SimpleRecipe from '../../components/recipe/SimpleRecipe'
import RecipeServices from '../../services/recipeServices'
import SearchBox from '../../components/SearchBox'
import Button from '../../components/controls/Button'
import Select from '../../components/controls/Select'
import RadioGroup from '../../components/controls/RadioGroup'
import { useForm } from '../../components/useForm'


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
  { id: 1, title: 'Salty' },
  { id: 2, title: 'Vegetarian' },
  { id: 3, title: 'Sweet' }
]

const index = () => {

  const classes = useStyles()
  const [recipes, setRecipes] = useState(null)
  const [filteredRecipes, setFilteredRecipes] = useState(null)

  const { values, setValues, handleInputChange } = useForm({
    filter: '',
    searchText: '',
    radioSelection: ''
  })

  let query = useQuery()

  useEffect(() => {
    let mounted = true
    const fetchRecipes = async () => {
      const recipes = await RecipeServices.getRecipes()
      if (mounted) {
        setRecipes(recipes)
        setFilteredRecipes(recipes)
        const scrollPosition = sessionStorage.getItem('scrollPositionRecipes')
        if (scrollPosition) {
          window.scrollTo(0, parseInt(scrollPosition))
          sessionStorage.removeItem('scrollPositionRecipes')
        }
        const queryRes = query.get('user')
        if (queryRes) {
          setValues({ ...values, ['searchText']: `user::${queryRes}` })
        }
      }
    }

    fetchRecipes()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    console.log(recipes)
    if (values.searchText.startsWith('user::')) {
      const result = recipes?.filter(r => {
        return r.user.username.toLowerCase() === values.searchText.substring(6)
          && (r.course === values.radioSelection.toLowerCase() || values.radioSelection === '')
      })

      // TODO: Filter drop down selections (following, most likes etc...)
      setFilteredRecipes(result)

    } else {
      const result = recipes?.filter(r => {
        return r.title.toLowerCase().includes(values.searchText.toLowerCase())
          && (r.course === values.radioSelection.toLowerCase() || values.radioSelection === '')
      })

      // TODO: Filter drop down selections (following, most likes etc...)
      setFilteredRecipes(result)
    }
  }, [values])

  const handleClick = () => {
    sessionStorage.setItem('scrollPositionRecipes', window.pageYOffset)
  }

  return (
    <Grid container className={classes.root}>
      <Grid className={classes.searchBox} item xs={12}>
        <Grid sx={{ display: 'flex', justifyContent: 'center' }} container direction="row">
          <Grid item>
            <Grid container>
              <SearchBox
                label="Search"
                name="searchText"
                placeholder="Search recipes"
                value={values.searchText}
                onChange={handleInputChange} />
              <Select
                sx={{ minWidth: '10px' }}
                name='filter'
                label='Filter'
                value={values.filter}
                onChange={handleInputChange}
                options={filterOptions} />
            </Grid>
          </Grid>
          <Grid item>
            <RadioGroup
              name="radioSelection"
              value={values.radioSelection}
              onChange={handleInputChange}
              items={radioOptions} />
          </Grid>
        </Grid>
      </Grid>
      {
        filteredRecipes?.map(r => (
          <Grid item key={r.id} xs={12} md={6} xl={4} align="center">
            <SimpleRecipe recipe={r}>
              <Button size="small" onClick={handleClick} text="Open" sx={{ margin: '0.2em' }} component={Link} to={`/recipes/${r.id}`} ></Button>
            </SimpleRecipe>
          </Grid>
        ))
      }
      <BackToTop />
    </Grid>
  )
}

export default index