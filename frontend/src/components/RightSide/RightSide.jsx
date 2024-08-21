import React, { useState } from "react";
import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import FollowersCard from "../FollowersCard/FollowersCard";

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);

  // Handler to open the modal
  const openModal = () => setModalOpened(true);

  // Handler to close the modal
  const closeModal = () => setModalOpened(false);

  return (
    <div className="RightSide">
      <FollowersCard />
      <button className="button r-button" onClick={openModal}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={closeModal} />
      <TrendCard />
    </div>
  );
};

export default RightSide;

