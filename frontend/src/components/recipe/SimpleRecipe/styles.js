import { makeStyles } from '@mui/styles'
const recipeStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    justifyContent: 'center',
    '& .MuiPaper-root:hover, & .img-skip-click:hover': {
      boxShadow: '2px 4px 3px 5px'
    },
  },
  card: {
    width: '300px',
  },
  recipeInfo: {
    marginTop: '1em !important',
  },
  recipeHeader: {
    textAlign: 'center',
    maxWidth: '265px',
  },
  '& .MuiCardMedia-root': {
    borderRadius: '4px',
    marginTop: '4px',
    width: '4em',
    height: '4em'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  }

}))

export default recipeStyles