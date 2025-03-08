import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import {
  AccountCircle,
  Edit,
  Email,
  Person,
  CalendarToday,
  ArrowBack,
} from "@mui/icons-material";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import { setAvatarAPI } from "../../utils/ApiRequest";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import "./profile.css";

// Import for avatar generator
const {
  uniqueNamesGenerator,
  colors,
  animals,
  countries,
  names,
  languages,
} = require("unique-names-generator");

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  // Avatar selection state
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [selectedSprite, setSelectedSprite] = useState("adventurer");
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [imgURL, setImgURL] = useState([]);

  const sprites = [
    "adventurer",
    "micah",
    "avataaars",
    "bottts",
    "initials",
    "adventurer-neutral",
    "big-ears",
    "big-ears-neutral",
    "big-smile",
    "croodles",
    "identicon",
    "miniavs",
    "open-peeps",
    "personas",
    "pixel-art",
    "pixel-art-neutral",
  ];

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  useEffect(() => {
    const loadUserData = () => {
      if (localStorage.getItem("user")) {
        const userData = JSON.parse(localStorage.getItem("user"));
        setUser(userData);
      } else {
        navigate("/login");
      }
      setLoading(false);
    };

    loadUserData();
  }, [navigate]);

  const handleOpenAvatarModal = () => {
    generateAvatars();
    setShowAvatarModal(true);
  };

  const handleCloseAvatarModal = () => {
    setShowAvatarModal(false);
    setSelectedAvatar(undefined);
  };

  const randomName = () => {
    return uniqueNamesGenerator({
      dictionaries: [animals, colors, countries, names, languages],
      length: 2,
    });
  };

  const generateAvatars = () => {
    setAvatarLoading(true);
    const imgData = [];
    for (let i = 0; i < 4; i++) {
      imgData.push(
        `https://api.dicebear.com/7.x/${selectedSprite}/svg?seed=${randomName()}`
      );
    }
    setImgURL(imgData);
    setAvatarLoading(false);
  };

  const handleSpriteChange = (e) => {
    setSelectedSprite(e.target.value);
    setAvatarLoading(true);
    const imgData = [];
    for (let i = 0; i < 4; i++) {
      imgData.push(
        `https://api.dicebear.com/7.x/${
          e.target.value
        }/svg?seed=${randomName()}`
      );
    }
    setImgURL(imgData);
    setAvatarLoading(false);
  };

  const updateAvatar = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    }

    try {
      setAvatarLoading(true);
      const { data } = await axios.post(`${setAvatarAPI}/${user._id}`, {
        image: imgURL[selectedAvatar],
      });

      if (data.isSet) {
        // Update user in local storage
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("user", JSON.stringify(user));

        // Update state
        setUser({ ...user, avatarImage: data.image });

        toast.success("Avatar updated successfully", toastOptions);
        handleCloseAvatarModal();
      } else {
        toast.error("Error updating avatar. Please try again", toastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", toastOptions);
      console.error("Avatar update error:", error);
    } finally {
      setAvatarLoading(false);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // Particle container loaded
  }, []);

  // Account creation date formatter
  const formatJoinDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <div className="profile-page">
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#181c32",
              },
            },
            fpsLimit: 60,
            particles: {
              number: {
                value: 80,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: "#7f85d5",
              },
              shape: {
                type: "circle",
              },
              opacity: {
                value: 0.3,
                random: true,
              },
              size: {
                value: 3,
                random: { enable: true, minimumValue: 1 },
              },
              links: {
                enable: false,
              },
              move: {
                enable: true,
                speed: 1,
              },
            },
            detectRetina: true,
          }}
          style={{
            position: "fixed",
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <Container className="profile-container">
          <div className="back-button-container">
            <Button
              variant="outline-light"
              className="back-button"
              onClick={() => navigate("/")}
            >
              <ArrowBack /> Back to Dashboard
            </Button>
          </div>

          <Card className="profile-card">
            <Card.Body>
              <div className="text-center profile-header">
                <div className="position-relative avatar-display">
                  {user?.avatarImage ? (
                    <img
                      src={user.avatarImage}
                      alt="User Avatar"
                      className="profile-avatar"
                    />
                  ) : (
                    <AccountCircle sx={{ fontSize: 150, color: "#7f85d5" }} />
                  )}
                  <Button
                    variant="light"
                    className="change-avatar-btn"
                    onClick={handleOpenAvatarModal}
                  >
                    <Edit fontSize="small" />
                  </Button>
                </div>

                <h2 className="profile-username">{user?.username || "User"}</h2>
                <div className="profile-email">
                  <Email fontSize="small" className="me-1" />
                  {user?.email || "No email available"}
                </div>
              </div>

              <div className="profile-details mt-5">
                <Row>
                  <Col md={6} className="mb-4">
                    <Card className="detail-card">
                      <Card.Body>
                        <h5 className="detail-title">
                          <Person className="me-2" />
                          Account Information
                        </h5>
                        <div className="detail-item">
                          <span className="detail-label">Username:</span>
                          <span className="detail-value">{user?.username}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Email:</span>
                          <span className="detail-value">{user?.email}</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>

                  <Col md={6} className="mb-4">
                    <Card className="detail-card">
                      <Card.Body>
                        <h5 className="detail-title">
                          <CalendarToday className="me-2" />
                          Account Status
                        </h5>
                        <div className="detail-item">
                          <span className="detail-label">Joined:</span>
                          <span className="detail-value">
                            {formatJoinDate(user?.createdAt)}
                          </span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">Status:</span>
                          <span className="detail-value status-active">
                            Active
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <div className="text-center mt-3">
                  <Button
                    variant="primary"
                    className="edit-profile-btn"
                    onClick={() =>
                      toast.info(
                        "Profile edit feature coming soon!",
                        toastOptions
                      )
                    }
                  >
                    Edit Profile Details
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Container>

        {/* Avatar Change Modal */}
        <Modal
          show={showAvatarModal}
          onHide={handleCloseAvatarModal}
          centered
          size="lg"
          className="avatar-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Change Your Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {avatarLoading ? (
              <div className="text-center py-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <Row className="avatar-grid">
                  {imgURL.map((image, index) => (
                    <Col xs={6} md={3} key={index} className="mb-4">
                      <div
                        className={`avatar-item ${
                          selectedAvatar === index ? "selected" : ""
                        }`}
                        onClick={() => setSelectedAvatar(index)}
                      >
                        <img
                          src={image}
                          alt={`Avatar option ${index + 1}`}
                          className="img-fluid"
                        />
                      </div>
                    </Col>
                  ))}
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Avatar Style</Form.Label>
                  <Form.Select
                    onChange={handleSpriteChange}
                    value={selectedSprite}
                    className="avatar-select"
                  >
                    {sprites.map((sprite, index) => (
                      <option value={sprite} key={index}>
                        {sprite}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div className="d-flex justify-content-center">
                  <Button
                    variant="outline-secondary"
                    onClick={generateAvatars}
                    className="me-2"
                  >
                    Generate New Options
                  </Button>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={handleCloseAvatarModal}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={updateAvatar}
              disabled={avatarLoading || selectedAvatar === undefined}
            >
              {avatarLoading ? "Updating..." : "Update Avatar"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
