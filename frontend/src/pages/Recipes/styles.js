import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100px',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: '15%',
    paddingRight: '15%',
    marginBottom: '200px',
    '& .backToTopBtn': {
      margin: 'auto',
      bottom: '50px',
      marginRight: '-300px',
      [theme.breakpoints.up(480)]: {
        marginRight: '-400px',
      },
      [theme.breakpoints.up(900)]: {
        marginRight: '-900px'
      },
      [theme.breakpoints.up(1536)]: {
        marginRight: '-1200px'
      },
    },
    '& .MuiFormControl-root, & .MuiPaper-root': {
      margin: '15px 0 0 0px',
      minWidth: '100px',
      [theme.breakpoints.up(900)]: {
        minWidth: '100px'
      },
    },
    '& .MuiCardMedia-root': {
      width: '100px',
      height: '100px'
    }
  },
  inputContainer: {
    marginTop: 8,
    padding: 5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  TextField: {
    textAlign: 'right',
    marginTop: 10
  },
  searchBox: {
    display: 'flex',
    justifyContent: 'center',
    '& .MuiGrid-root': {
      justifyContent: 'center'
    },
    '& .MuiFormControl-root': {
      marginLeft: '10px'
    }
  },
  newRecipe: {
    display: 'flex',
    justifyContent: 'center',
  }
}))

export default useStyles