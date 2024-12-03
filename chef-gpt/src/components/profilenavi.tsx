import React from "react";
import { useAuth } from "../context/UserContext";
import "../css/navigation.css";
interface ProfileNaviProps {
  show: boolean;
  onClose: () => void;
}

const ProfileNavi: React.FC<ProfileNaviProps> = ({ show, onClose }) => {
  const { logout, user } = useAuth();

  return (
    <div className={`profile-container ${show ? "open" : ""}`}>
      <div className="username-email">
        <img
          src={
            user?.image?.startsWith("/upload")
              ? `http://localhost:5000${user.image}`
              : user?.image.split("=")[0]
          }
          alt="User Profile"
          className="pfimgnavi"
        />
        <div className="ue">
          <button>
            <h4>{user?.userName}</h4>
          </button>
          <button>
            <span>{user?.email}</span>
          </button>
        </div>
        <button className="close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="custom-navi">
        <ul>
          <li>
            <span className="material-symbols-outlined">person</span>Your
            Profile
          </li>
          <li>
            <span className="material-symbols-outlined">public</span>Your Post
          </li>
          <li>
            <span className="material-symbols-outlined">star</span>Favorite
          </li>
          <li
            onClick={() => {
              logout();
              onClose();
            }}
          >
            <span className="material-symbols-outlined">logout</span>
            Sign Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileNavi;
