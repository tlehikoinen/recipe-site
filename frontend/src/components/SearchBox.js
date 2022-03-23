import { InputBase, Paper, } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search'

const SearchBox = ( { setText }) => {

  const onChange = (e) => {
    setText(e.target.value)
  }
  return (
    <Paper sx={{ marginTop:'20px' }}>
      <InputBase
        onChange={(e) => onChange(e)}
        type='search'
        placeholder='Search users'
        startAdornment={<SearchIcon fontSize="small" />}
      />
    </Paper>

  )
}

export default SearchBox