import { makeStyles } from '@mui/styles'
const recipeStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    justifyContent: 'center',
    '& .MuiPaper-root:hover': {
      boxShadow: '0px 0px 8px 2px'
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