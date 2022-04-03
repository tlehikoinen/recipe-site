import { makeStyles } from '@mui/styles'


const useStyles = makeStyles((theme) => ({
  root: {
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
  },
  header: {
    textAlign: 'center',
  },
  info: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },



}))

export default useStyles