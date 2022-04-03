import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& .MuiCardMedia-root': {
      borderRadius: '4px',
      marginTop: '1.3em',
      width: '8em',
      height: '8em',
      '&:hover': {
        boxShadow: '2px 4px 3px 5px'
      }
    },
    '& .centered': {
      display: 'flex',
      justifyContent: 'space-evenly',
    },
  },
  card: {
    width: '360px',
    [theme.breakpoints.up('sm')]: {
      width: '500px'
    }
  }
}))


export default useStyles