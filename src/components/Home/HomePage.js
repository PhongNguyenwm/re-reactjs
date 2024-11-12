import React from "react";
import videoHomePage from "../../assets/video-homepage.mp4";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <video autoPlay loop muted>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="homepage-title">There's is a better way to ask</div>
        <div className="homepage-desc">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error rerum
          tenetur quis accusamus quo, impedit qui quisquam aperiam molestiae
          nesciunt?
        </div>
        <div>
          {!isAuthenticated ? (
            <button className="homepage-btn" onClick={() => navigate("/login")}>
              Get started. It's free
            </button>
          ) : (
            <button onClick={() => navigate("/user")}>Doing Quiz Now</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
