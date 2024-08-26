import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Row, Col, Form, Button } from "react-bootstrap";
import VideoCard from "../Components/Videos/VideoCard";
import { baseURL } from "../Config/config";

function Videos() {
  const [videos, setVideos] = useState([]);
  const [videoId, setVideoId] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const retrieveVideos = () => {
    axios
      .get(`${baseURL}/videos/all-videos`)
      .then((res) => {
        setVideos(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(retrieveVideos, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!videoId) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    navigate(`/sign-kit/video/${videoId}`, { replace: false });
  };

  const handleClick = (videoId) => {
    navigate(`/sign-kit/video/${videoId}`, { replace: false });
  };

  const videoList = videos.map((video, index) => (
    <VideoCard key={index} video={video} handleClick={handleClick} />
  ));

  return (
    <div className="container-fluid d-flex flex-column align-items-center px-0">
      <div className="container-fluid text-white" style={{backgroundColor: '#00428a'}}>
        <div className="container my-5">
          <div className="display-5 px-2 text-center">
            Explore ISL Videos!
          </div>
          <div className="lead text-center">
            Welcome to the ISL video section of Sign Kit. Create your own public
            or private videos, share with your friends and colleagues or browse
            through the videos created by others and shared with the entire
            community!
          </div>
        </div>
      </div>

      <hr />

      <section id="create-video">
        <div className="container">
          <div className="row my-4">
            <div
              className="col-md-12 d-flex justify-content-center align-items-center"
              style={{ flexDirection: "column" }}
            >
              <div className="h2 section-heading">Create a new video!</div>
              <div className="col-lg-4 divider my-2" />
              <div className="text-center normal-text">
                Create your own video within a few clicks! Provide your content
                via text, speech or file and keep the videos private or share
                them with the entire community! Each video generates a video ID
                which can be used to access the video directly.
              </div>
              <Link to='/sign-kit/create-video' className="btn btn-primary mt-4">
                Create your own Video!
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="hor-line" />

      <section id="Open-video">
        <div className="container">
          <div className="row mt-3">
            <div
              className="col-md-12 d-flex justify-content-center align-items-center"
              style={{ flexDirection: "column" }}
            >
              <div className="h2 section-heading">Your Video Feed</div>
              <div className="col-lg-4 divider my-2" />
              <div className="text-center normal-text">
                Browse through the ISL videos created by others and shared with
                the entire community!
              </div>
              <a
                target="_blank"
                rel="noreferrer"
                href="/sign-kit/feedback"
                className="btn btn-info"
              >
                Open Feedback Form
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="row container d-flex flex-column justify-content-center align-items-center">
        {videoList}
      </div>
    </div>
  );
}

export default Videos;
