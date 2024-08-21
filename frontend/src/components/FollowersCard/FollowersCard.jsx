import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FollowersCard.css';

const FollowersCard = () => {
  const [users, setUsers] = useState([]);
  const [unfollow, setUnfollow] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/users/fetchUsers");
      console.log("all users", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    const followersList = localStorage.getItem("followersList");
    setUnfollow(followersList ? JSON.parse(followersList) : []);
  }, []);

  const handleFollow = async (followerId) => {
    const formData = {
      userId: localStorage.getItem("userId"),
      followerId: followerId._id
    };

    try {
      const response = await axios.post('http://localhost:8080/api/profile/follow', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const userData = response.data;
      setUnfollow(userData.followersList);
      localStorage.setItem("followersList", JSON.stringify(userData.followersList));
      console.log("Posting..... info response", userData);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div className="FollowersCard">
      <h3>People you may follow</h3>
      {users.length > 0 ? users.filter(item => !localStorage.getItem("name").startsWith(item.firstName)).map((follower, id) => (
        <div key={id} className="follower">
          <div>
            <img src={follower.img} alt="" className='followerImage' />
            <div className="name">
              <span>{follower.firstName}</span>
              <span>@{follower.username}</span>
            </div>
          </div>
          <button className='button fc-button' onClick={() => handleFollow(follower)}>
            {unfollow.includes(follower._id) ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      )) : null}
    </div>
  );
};

export default FollowersCard;
