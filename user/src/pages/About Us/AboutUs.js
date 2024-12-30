import React from "react";
import "./AboutUs.css"; // Import CSS file for animations

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1 className="fade-in">About Our Project</h1>
      <p className="slide-up">
        Our project is a drone-based system for early detection and monitoring of
        forest fires using computer vision and machine learning. The system
        consists of a drone equipped with a high-resolution camera and AI
        software that can detect fires from aerial images. The drone can fly
        autonomously over a designated area and transmit real-time images to a
        central server. The AI software analyzes the images and detects fires
        based on predefined criteria. The system can also detect changes in the
        fire's size, shape, and intensity over time, allowing for more accurate
        monitoring and prediction of fire spread.
      </p>
      <p className="slide-up">
        The goal of our project is to provide a cost-effective and efficient
        solution for early detection and monitoring of forest fires, which can
        help save lives, property, and the environment. We believe that our
        system can be a valuable tool for fire departments, forestry services,
        and other organizations responsible for fire prevention and management.
      </p>
    </div>
  );
};

export default AboutPage;


