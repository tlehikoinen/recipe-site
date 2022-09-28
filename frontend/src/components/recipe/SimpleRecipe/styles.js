import { makeStyles } from '@mui/styles'
const recipeStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    justifyContent: 'center',
    '& .MuiPaper-root:hover, & .img-skip-click:hover': {
      boxShadow: '0px 0px 8px 2px'
    },
  },
  card: {
    width: '320px',
    '& .MuiCardMedia-root': {
      borderRadius: '4px',
      height: '100px',
      width: '100px'
    },
  },
  recipeInfo: {
    marginTop: '1em !important',
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