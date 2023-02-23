import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
// import "./App.css";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import cameraIcon from "./Icons/camrea.svg";
import flip from "./Icons/flip.svg";
import upload from "./Icons/Object.svg";
import faceki from "./Icons/faceki.svg";

const CaptureCard = () => {
  const [camera, setCamera] = useState("user");
  const [captureImage, setCaptureImage] = useState(null);
  const crop = {
    unit: "px",
    x: 25, // center the border horizontally
    y: 28, // adjust the top margin as needed
    width: 400,
    height: 220.58,
    // aspect: 1.5 / 1, // set to ID card aspect ratio
  };
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 458.3,
    height: 276.58,
    facingMode: camera,
  };

  const capture = () => {
    let imageSrc = webcamRef.current.getScreenshot();

    // After taking ss crop the image according to the given width and height and more
    const canvas = document.createElement("canvas");
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");
    const imageObj = new Image();
    imageObj.src = imageSrc;
    imageObj.onload = () => {
      ctx.drawImage(
        imageObj,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
      );
      const croppedImage = canvas.toDataURL("image/jpeg");
      // now set the image after croping and converting
      setCaptureImage(croppedImage);
    };
  };
  // const handleCropChange = (newCrop) => {
  //   setCrop(newCrop);
  // };

  const handleCameraFlip = () => {
    setCamera(camera === "user" ? "environment" : "user");
  };

  return (
    <div className="capture-card-container">
      <div className="navigation">
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </div>
      {/* front-side backside rectangle */}
      <div className="front-back">
        <h5>
          {captureImage === null ? (camera === "user"
              ? "FRONT SIDE"
              : "BACK SIDE")
            : 'Taken'}
        </h5>
      </div>
      <div className="camera">
        {captureImage === null ? (
          <Webcam
            audio={false}
            mirrored={camera === "user"}
            ref={webcamRef}
            videoConstraints={videoConstraints}
          />
        ) : (
          <></>
        )}
        <ReactCrop
          src={captureImage}
          crop={crop}
          // onChange={handleCropChange}

          ruleOfThirds
          locked={true}
          keepSelection={false}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />

        {/* <div className="webcamBorder"></div> */}
      </div>
      {captureImage !== null ? (
        ""
      ) : (
        <div className="paragraph">
          <div>We'll ask you to enable camera access.</div>
          <div>More about verification</div>
        </div>
      )}
      
      <div className="buttons">
        {/* <button onClick={capture}>Capture</button> */}
        <img
          src={flip}
          onClick={handleCameraFlip}
          alt=""
          width={30}
          height={31}
        />
        {captureImage != null ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              setCaptureImage(null);
            }}
          >
            Retake
          </button>
        ) : (
          <img
            src={cameraIcon}
            onClick={capture}
            alt=""
            width={80}
            height={80}
          />
        )}

        <img src={upload} alt="" width={30} height={31} />
      </div>
      {captureImage && (
        <img
          src={captureImage}
          alt="Captured"
          style={{
            width: crop.width,
            height: crop.height,
            objectFit: "cover",
          }}
        />
      )}
      <img src={faceki} alt="name" style={{ alignSelf: "flex-start" }} />
    </div>
  );
};

export default CaptureCard;
