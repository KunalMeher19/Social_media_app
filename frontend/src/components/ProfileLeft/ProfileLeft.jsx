import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileSide from '../profileSide/ProfileSide';
import { UilSetting } from "@iconscout/react-unicons";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import InfoCard from '../InfoCard/InfoCard';
import { Link } from "react-router-dom";

const ProfileLeft = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Perform any server-side logout actions if needed
      // Example: await axios.post('http://localhost:8080/api/users/logout');

      // Clear localStorage or sessionStorage
      localStorage.clear();
      sessionStorage.clear();

      // Redirect to the login page or home page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally, handle errors (e.g., show a message to the user)
    }
  };

  return (
    <div className="ProfileSide">
      <InfoCard />
      <div className="Menu">
        <Link to="/home">
          <div className="menu-items">
            <HomeIcon style={{ marginRight: 10, color: "#3db3f3" }} />
            Home
          </div>
        </Link>
        <Link to="/profile">
          <div className="menu-items">
            <AccountCircleIcon
              style={{ marginRight: 10, color: "#3db3f3" }}
            />
            Profile
          </div>
        </Link>
        <Link to="/settings">
          <div className="menu-items">
            <UilSetting style={{ marginRight: 10, color: "#3db3f3" }} />
            Settings
          </div>
        </Link>
        <div className="menu-items" onClick={handleLogout} style={{ cursor: "pointer" }}>
          <LogoutIcon style={{ marginRight: 10, color: "#3db3f3" }} />
          Log Out
        </div>
      </div>
    </div>
  );
}

export default ProfileLeft;
