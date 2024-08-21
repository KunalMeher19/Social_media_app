import React, { useEffect, useState } from "react";
import axios from "axios";
import Cover from "../../img/cover.jpg";
import "./ProfileCard.css";

const ProfileCard = () => {
  const [profileData, setProfileData] = useState('');

  const fetchInfo = async () => {
    try {
      const formData = {
        userId: localStorage.getItem("userId"),
      };
      const response = await axios.post('http://localhost:8080/api/profile/data', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("Fetching profile info response", response);
      if (response.status === 200) {
        setProfileData(response.data);
      }
    } catch (error) {
      console.error("Error fetching profile info:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const ProfilePage = true;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img src={Cover} alt="Cover" />
        <img src={localStorage.getItem("image")} alt="Profile" />
      </div>

      <div className="ProfileName">
        <span>{localStorage.getItem("name")}</span>
      </div>

      <div className="followStatus">
        <div>
          <div className="follow">
            <span>{profileData?.followings}</span>
            <span className="textbased">Followings</span>
          </div>
          <div className="follow">
            <span>{profileData?.followers}</span>
            <span>Followers</span>
          </div>

          {ProfilePage && (
            <div className="follow">
              <span>{profileData?.posts}</span>
              <span>Posts</span>
            </div>
          )}
        </div>
      </div>
      {ProfilePage ? "" : <span>My Profile</span>}
    </div>
  );
};

export default ProfileCard;
