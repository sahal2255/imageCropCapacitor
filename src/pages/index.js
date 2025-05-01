import Header from '@/components/Header'
import ImageUpload from '@/components/ImageUpload'
import ImageView from '@/components/ImageView'
import React, { useState } from 'react'

const Home = () => {
  const [file,setFile]=useState(null)
  const [imageResult,setImageResult]=useState(null)
  const imageFile=(data)=>{
    setFile(data)
    setImageResult(null) 
  }
  // console.log('image file in app',file)
  // console.log('croped image file',imageResult)
  return (
    <div className=''>
      <Header />
      <div className='mt-4 mx-auto'>
        <ImageUpload imageFile={imageFile}/>
        
        {!imageResult && file && (
          <ImageView file={file} setImageResult={setImageResult} />
        )}
        {imageResult&&(
          <div className="flex justify-center mt-4">
          <img
            src={imageResult}
            alt="Cropped"
            className="max-h-80 border rounded-lg"
          />
        </div>
        )}
      </div>
    </div>
  )
}

export default Home
