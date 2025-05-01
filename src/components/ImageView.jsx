import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageView = ({ file ,setImageResult}) => {
  const [crop, setCrop] = useState({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 30,
    aspect: 1,
  });
  const [croppedImage, setCroppedImage] = useState(null);
  const imgRef = useRef(null);

  if (!file) return null;

  const onImageLoaded = (img) => {
    imgRef.current = img;
  };

  const handleSaveImage = async () => {
    if (imgRef.current && crop.width && crop.height) {
      const croppedBase64 = await getCroppedImage(imgRef.current, crop);
      setCroppedImage(croppedBase64);
      setImageResult(croppedBase64)
    }
  };

  const getCroppedImage = (image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result); // ✅ Base64 string
        };
      }, "image/jpeg");
    });
  };

  return (
    <>
      <div className="flex justify-center items-center p-4">
        <div className="crop-container">
          <ReactCrop
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onImageLoaded={onImageLoaded}
          >
            <img
              ref={imgRef}
              style={{ height: "400px", width: "auto" }}
              src={file}
              alt="Uploaded"
            />
          </ReactCrop>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSaveImage}
          className="bg-blue-600 text-white hover:bg-blue-800 w-28 h-12 rounded-lg"
        >
          Save Image
        </button>
      </div>

      
    </>
  );
};

export default ImageView;
