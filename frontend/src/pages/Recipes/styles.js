import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    paddingLeft: '15%',
    paddingRight: '15%',
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
      margin: '15px 0 0 20px',
      minWidth: '100px',
      [theme.breakpoints.up(900)]: {
        minWidth: '100px'
      },
    },
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
    justifyContent: 'center'
  }
}))

export default useStyles