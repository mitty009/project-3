import React, {useState} from 'react'

import './styles/style.scss'


// For environment varibles
console.log(process.env.hello)

const App = () => {
  const [image, setImage] = useState('')

  function handleUpload() {
    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dky2sqc0z', 
        uploadPreset: 'clique1', 
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success'){
          return
        }
        Axios.put('/api/image/alis_test_image', { url: result.info.secure_url })
          .then((res) => setImage(res.data))
      }
    ).open()
  }

  console.log(image)
  return <>
  <img src={image.url}/>
    <button onClick={handleUpload}
    >Upload Image
    </button>
  </>

}


export default App