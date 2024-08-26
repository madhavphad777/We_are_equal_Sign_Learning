import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Row, Form, Col, Button, Modal } from "react-bootstrap";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import axios from "axios";
import { baseURL } from "../Config/config";

function FeedbackForm() {
  const [feedback, setFeedback] = useState({ name: "", email: "", mobile: "", text: "" });
  const [validated, setValidated] = useState(false);
  const [mode, setMode] = useState("text");
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const navigate = useNavigate();

  const handleInputChanges = (event) => {
    const { name, value } = event.target;
    setFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  const validateFeedback = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!feedback.name || !emailRegex.test(feedback.email) || !mobileRegex.test(feedback.mobile)) return false;
    if (mode === "text" && !text) return false;
    if (mode === "file" && !file) return false;
    if (mode === "speech" && !transcript) return false;
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFeedback()) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    let content = "";
    if (mode === "text") content = text;
    if (mode === "file") content = await file.text();
    if (mode === "speech") content = transcript;

    const feedbackData = { ...feedback, text: content };

    try {
      await axios.post(`${baseURL}/feedback`, feedbackData);
      setShowModal(true); // Show confirmation modal after successful submission
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate('/feedback/thank-you', { replace: true });
  };

  return (
    <div className="container-fluid d-flex flex-column align-items-center px-0">
      {/* Header and Intro Section */}
      <div className="container-fluid text-white" style={{ backgroundColor: "#00428a" }}>
        <div className="container my-5">
          <div className="display-5 px-2 text-center">Give your Feedback!</div>
          <div className="lead text-center">
            Help us improve our webapp by providing your valuable feedback.
          </div>
        </div>
      </div>

      <hr />
      <div className="container d-flex flex-column align-items-center">
        {/* <div className="display-5 mt-5 px-2 text-center">Give Your Feedback!</div>
        <div className="lead mb-5 px-2 text-center">
          Please provide your feedback using the options below.
        </div> */}

        <Row className="container">
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center p-0">
            {/* Name Field */}
            <Form.Group controlId="name" as={Col} xs="12" md="7" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Your Name"
                value={feedback.name}
                name="name"
                onChange={handleInputChanges}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter your name.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Email Field */}
            <Form.Group controlId="email" as={Col} xs="12" md="7" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Your Email"
                value={feedback.email}
                name="email"
                onChange={handleInputChanges}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Mobile Field */}
            <Form.Group controlId="mobile" as={Col} xs="12" md="7" className="my-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                required
                type="tel"
                placeholder="Your Mobile Number"
                value={feedback.mobile}
                name="mobile"
                onChange={handleInputChanges}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please enter a valid mobile number.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Mode Selection */}
            <Form.Group controlId="mode" as={Col} xs="12" md="7" className="my-3">
              <Form.Label>Select a mode to provide your feedback</Form.Label>
              <Form.Select required value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="text">Type your feedback</option>
                <option value="speech">Speak through mic</option>
                <option value="file">Upload a text file</option>
              </Form.Select>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please select a mode.
              </Form.Control.Feedback>
            </Form.Group>

            {/* Text Feedback */}
            {mode === "text" && (
              <Form.Group controlId="text" as={Col} xs="12" md="7" className="my-3">
                <Form.Label>Enter your feedback here</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Type your feedback here..."
                  name="content"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  as="textarea"
                  rows={8}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please type your feedback.
                </Form.Control.Feedback>
              </Form.Group>
            )}

            {/* File Feedback */}
            {mode === "file" && (
              <Form.Group controlId="formFile" as={Col} xs="12" md="7" className="my-3">
                <Form.Label>Upload your text (.txt) file here</Form.Label>
                <Form.Control
                  type="file"
                  accept=".txt"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please upload a text file here.
                </Form.Control.Feedback>
              </Form.Group>
            )}

            {/* Speech Feedback */}
            {mode === "speech" && (
              <>
                <div className="col-md-7 d-flex flex-column justify-content-center my-3">
                  <div className="row d-flex justify-content-center">
                    <label className="mb-2">Speech Recognition: {listening ? "on" : "off"}</label>
                    <Button className="col-md-3 mx-3" onClick={startListening}>
                      Mic On <i className="fa fa-microphone" />
                    </Button>
                    <Button className="col-md-3 mx-3" onClick={stopListening}>
                      Mic Off <i className="fa fa-microphone-slash" />
                    </Button>
                    <Button className="col-md-3 mx-3" onClick={resetTranscript}>
                      Clear
                    </Button>
                  </div>
                </div>

                <Form.Group controlId="speech-text" as={Col} xs="12" md="7" className="my-3">
                  <Form.Label>Use the controls and speak through your mic</Form.Label>
                  <Form.Control
                    required
                    readOnly
                    type="text"
                    placeholder="Your feedback will be displayed here..."
                    name="content"
                    value={transcript}
                    as="textarea"
                    rows={8}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please speak through your mic.
                  </Form.Control.Feedback>
                </Form.Group>
              </>
            )}

            <Button type="submit" className="mt-3">Submit Feedback</Button>
          </Form>
        </Row>

        {/* Confirmation Modal */}
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Feedback Submitted</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Your feedback has been submitted successfully. Thank you!</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default FeedbackForm;
