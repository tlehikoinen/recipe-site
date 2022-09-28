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
        boxShadow: '0px 0px 8px 2px'
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