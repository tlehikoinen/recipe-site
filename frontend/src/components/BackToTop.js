import React, { useEffect, useState } from 'react'
import Controls from './controls/Controls'

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
      {showButton && <Controls.Button onClick={scrollToTop} className='backToTopBtn' text="Top!" sx={{ position: 'fixed' }}/>}
    </>
  )
}

export default BackToTop