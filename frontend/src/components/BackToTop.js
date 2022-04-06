import React, { useEffect, useState } from 'react'
import UpIcon from '@mui/icons-material/KeyboardArrowUp'
import Fab from '@mui/material/Fab'

const BackToTop = ( { windowOffsetLimit }) => {
  const [showButton, setShowButton] = useState(false)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > (windowOffsetLimit || 200)) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [showButton])
  return (
    <>
      {showButton &&
      <Fab color='primary' className='backToTopBtn' sx={{ position: 'fixed' }} onClick={scrollToTop} >
        <UpIcon/>
      </Fab> }
    </>
  )
}

export default BackToTop