import { useState, useRef } from 'react'
import Resizer from 'react-image-file-resizer'

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      'file'  // Output type, can be 'base64', 'blob', or 'file'
    )
  })

const ImageLoader = () => {

  // Used to load images from filesystem, avatar can be used in <img> components
  const [file, setFile] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const inputFile = useRef()

  const onChangeFile = async (e) => {
    try {
      const file = e.target.files[0]
      if (!file) {
        return
      }
      if (file.size > 999999) { // 1 MB
        const newFile = await resizeFile(file)  // Resize image
        setFile(newFile)
        setAvatar(URL.createObjectURL(file))
      } else {  // No need to resize
        setFile(file)
        setAvatar(URL.createObjectURL(file))
      }
    } catch(err) {
      console.log(err)
    }
  }

  return {
    file, setFile, inputFile, onChangeFile, avatar, setAvatar
  }

}

export default ImageLoader