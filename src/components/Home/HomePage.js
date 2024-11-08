import React from "react";
import videoHomePage from "../../assets/video-homepage.mp4";

const HomePage = (props) => {
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
          <button className="homepage-btn">Get started. It's free</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
