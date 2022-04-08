import { makeStyles } from '@mui/styles'
const recipeStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    justifyContent: 'center',
    '& .MuiPaper-root:hover': {
      boxShadow: '2px 4px 3px 5px'
    },
  },
  card: {
    width: '175px',
    '& .MuiCardMedia-root': {
      borderRadius: '4px',
      height: '125px',
      width: '125px'
    },
    [theme.breakpoints.up('sm')]: {
      width: '300px',
      '& .MuiCardMedia-root': {
        borderRadius: '4px',
        height: '200px',
        width: '200px'
      },
    }
  },

}))

export default recipeStyles