import { InputBase, Paper, } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'

// const SearchBox = ( { placeholder, setText }) => {

//   const onChange = (e) => {
//     setText(e.target.value)
//   }
//   return (
//     <Paper sx={{ marginTop:'20px' }}>
//       <InputBase
//         onChange={(e) => onChange(e)}
//         type='search'
//         placeholder={placeholder || 'Search'}
//         startAdornment={<SearchIcon fontSize="small" />}
//       />
//     </Paper>

//   )
// }

const SearchBox = ( { label, name, value, onChange, ...others }) => {

  return (
    <Paper sx={{ display: 'flex', alignItems:'center', opacity: '0.8' }}>
      <InputBase
        variant="outlined"
        type='search'
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label || 'Search'}
        startAdornment={<SearchIcon fontSize="small" />}
        {...others}
      />
    </Paper>

  )
}



export default SearchBox