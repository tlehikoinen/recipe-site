import { makeStyles } from '@mui/styles'
const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
  },
  card: {
    maxWidth: '400px',
    '& .MuiButton-root': {
      minWidth: '80px',
    },
    '& .MuiCardMedia-root': {
      borderRadius: '4px',
      marginTop: '4px',
      height: '125px',
      width: '125px'
    },
    '& .MuiTypography-body2': {
      opacity: '0.6'
    },
    [theme.breakpoints.up('xs')]: {
      margin: theme.spacing(2),
    },
  },
  editProfile: {
    '& .MuiButton-root': {
      minWidth: '120px !important',
    },
  },
  dialog: {
    '& .MuiDialog-container': {
      justifyContent: 'center',
      alignItems: 'flex-start',
      marginTop: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        marginTop: theme.spacing(12)
      }
    },
    '& .MuiTypography-root': {
      textAlign: 'center'
    },
    '& .MuiDialogActions-root': {
      justifyContent: 'center'
    },
    '& label': {
      width: '100%',
      textAlign: 'center',
      transformOrigin: 'center',
      '&.Mui-focused': {
        transformOrigin: 'center'
      }
    }
  }
}))

export default useStyles