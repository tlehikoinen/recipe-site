import { makeStyles } from '@mui/styles'


const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '200px',
    marginTop: '1em',
    display: 'flex',
    justifyContent: 'center',
    '& .MuiPaper-root': {
      width: '340px',
      [theme.breakpoints.up('sm')]: {
        width: '590px'
      },
    },
    '& .MuiCardMedia-root': {
      width: '100px',
      height: '100px',
      [theme.breakpoints.up('sm')]: {
        width: '150px',
        height: '150px',
        borderRadius: '4px'
      }
    },
    '& .backToTopBtn': {
      margin: 'auto',
      bottom: '50px',
      marginRight: '-270px',
      [theme.breakpoints.up(480)]: {
        marginRight: '-400px',
      }
    },
    '& .centered': {
      display: 'flex',
      justifyContent: 'space-evenly',
      '& .MuiFormControl-root': {
        marginTop: '10px',
        minWidth: '90px'
      }
    },
  },
  header: {
    textAlign: 'center',
  },
  info: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  newRecipe: {
    display: 'flex',
    justifyContent: 'center'
  }




}))

export default useStyles