import React, { useState } from 'react'

const cats = [
  'https://www.vetcare.fi/wp-content/uploads/Luonnosta-loydetty-arka-kissa-kotiutuu-yleensa-hyvin-uuteen-perheeseen.jpg',
  'https://evidensia.fi/wp-content/uploads/2020/06/kissa-kesa%CC%88-evidensia-scaled.jpg',
  'https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d'
]

const Info = () => {
  const [cat, setCat] = useState(false)
  const [catNumber, setCatNumber] = useState(0)


  const handleClick = () => {
    setCat(!cat)
    if(!cat) return
    if (catNumber === cats.length-1) {
      setCatNumber(0)
    } else {
      setCatNumber(catNumber+1)
    }
  }

  return (
    <div>
      {cat
        ?
        <div
          role="button"
          tabIndex={0}
          onClick={handleClick}
          onKeyPress={() => console.log('hurray')}>
          <img
            height="400"
            width="400"
            src={cats[catNumber]}
            alt="loading...">
          </img>
        </div>
        :
        <div>
          <button onClick={handleClick}>Täällä on kissa</button>
        </div>
      }

    </div>
  )
}

export default Info