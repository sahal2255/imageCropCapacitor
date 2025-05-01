import React, { useState } from 'react';

const ImageUpload = ({imageFile}) => {

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('file',file)
    if (file) {
      imageFile(URL.createObjectURL(file)); 
    }
  };
  return (
    <div className="flex justify-center items-center p-4">
      <label
        htmlFor="fileInput"
        className="cursor-pointer border border-gray-300 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition"
      >
        Choose Image
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
      
    </div>
  );
};

export default ImageUpload;
