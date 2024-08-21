import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Posts.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import NotLike from "../../img/notlike.png";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/posts/fetchAllPosts");
      setPosts(response.data.reverse()); // Reverse to show the latest posts first
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleLikes = async (post) => {
    try {
      const formData = {
        _id: post._doc._id,
        userId: localStorage.getItem("userId"),
      };

      const response = await axios.post("http://localhost:8080/api/profile/like", formData);
      if (response.status === 200) {
        fetchPosts();
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="Posts">
      {posts.length > 0 &&
        posts.map((post, id) => (
          <div className="Post" key={id}>
            {post._doc.format === "image" ? (
              <img
                src={`data:image/jpeg;base64,${post.postBase64}`}
                alt="Post"
                className="post-img"
              />
            ) : (
              <video
                src={`data:video/mp4;base64,${post.postBase64}`}
                alt="Video"
                controls
                style={{ maxWidth: "100%" }}
              />
            )}
            <div className="postReact">
              <img
                src={post._doc.likedUser.includes(localStorage.getItem("userId")) ? Heart : NotLike}
                alt=""
                style={{ cursor: "pointer" }}
                onClick={() => handleLikes(post)}
              />
              <img src={Comment} alt="" style={{ cursor: "pointer" }} />
              <img src={Share} alt="" style={{ cursor: "pointer" }} />
            </div>
            <span style={{ color: "var(--gray)", fontSize: "12px" }}>
              {post._doc.likes} likes
            </span>
            <div className="detail">
              <span>
                <b>{post._doc.name}</b>
              </span>
              <span> {post._doc.desc || ""}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Posts;
