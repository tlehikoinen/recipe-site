import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  root: {
    justifyContent: 'center',
    marginTop: '4em',
    '& .MuiFormLabel-root': {
      textAlign: 'center'
    }
  }
}))


export default useStyles