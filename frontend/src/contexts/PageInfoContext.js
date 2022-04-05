import React from 'react'

// Theme can be either 'light' or 'dark'
const PageInfoContext = React.createContext( { theme: '', toggleTheme: () => {} } )

export default PageInfoContext