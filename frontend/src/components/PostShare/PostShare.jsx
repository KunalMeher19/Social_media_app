import React, { useState, useRef } from "react";
import axios from "axios";
import "./PostShare.css";
import { UilScenery, UilPlayCircle, UilTimes } from "@iconscout/react-unicons";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [desc, setDesc] = useState("");
  const imageRef = useRef();
  const videoRef = useRef();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        setImage({
          image: URL.createObjectURL(img),
          base64String: e.target.result,
        });
      };
      reader.readAsDataURL(img);
    }
  };

  const onVideoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let vid = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (e) => {
        setVideo({
          video: URL.createObjectURL(vid),
          base64String: e.target.result,
        });
      };
      reader.readAsDataURL(vid);
    }
  };

  const postMedia = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", "Tzuyu");
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("desc", desc);
      formData.append("likes", 0);
      formData.append("liked", false);

      if (image) {
        formData.append("images", image.base64String);
      } else if (video) {
        formData.append("images", video.base64String);
      }

      const endpoint = image
        ? "http://localhost:8080/api/posts/upload"
        : "http://localhost:8080/api/posts/upload/video";

      const response = await axios.post(endpoint, formData);

      if (response.status === 200) {
        console.log("Media uploaded successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error uploading media:", error);
    }

    resetFields();
  };

  const resetFields = () => {
    setImage(null);
    setVideo(null);
    setDesc("");
    imageRef.current.value = null;
    videoRef.current.value = null;
  };

  return (
    <div className="PostShare">
      <img src={localStorage.getItem("image")} alt="" />
      <div>
        <div className="InputContainer">
          <input
            placeholder="What's happening ?!"
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="input"
          />
        </div>
        <div className="postOptions">
          <div className="option" onClick={() => imageRef.current.click()}>
            <UilScenery style={{ marginRight: 5 }} />
            Photo
          </div>
          <div className="option" onClick={() => videoRef.current.click()}>
            <UilPlayCircle style={{ marginRight: 5 }} />
            Video
          </div>
          <button className="button-share" onClick={postMedia}>
            Share
          </button>
          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
            <input type="file" ref={videoRef} onChange={onVideoChange} />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={image.image} alt="" />
          </div>
        )}
        {video && (
          <div className="previewImage">
            <video src={video.video} controls style={{ maxWidth: '100%' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
