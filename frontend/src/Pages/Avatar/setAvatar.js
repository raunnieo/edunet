import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import spinner from "../../assets/gg.gif";
import "./avatar.css";
import { Button, Container, Card, Row, Col, Form } from "react-bootstrap";
import { setAvatarAPI } from "../../utils/ApiRequest.js";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import munshiLogo from "../../assets/munshi.jpg";

// import Buffer from "buffer";
const {
  uniqueNamesGenerator,
  colors,
  animals,
  countries,
  names,
  languages,
} = require("unique-names-generator");

const SetAvatar = () => {
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
    "identicon",
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

  const navigate = useNavigate();

  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [selectedSprite, setSelectedSprite] = React.useState(sprites[0]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  const randomName = () => {
    let shortName = uniqueNamesGenerator({
      dictionaries: [animals, colors, countries, names, languages],
      length: 2,
    });
    return shortName;
  };

  const [imgURL, setImgURL] = React.useState([
    `https://api.dicebear.com/7.x/${sprites[0]}/svg?seed=${randomName()}`,
    `https://api.dicebear.com/7.x/${sprites[0]}/svg?seed=${randomName()}`,
    `https://api.dicebear.com/7.x/${sprites[0]}/svg?seed=${randomName()}`,
    `https://api.dicebear.com/7.x/${sprites[0]}/svg?seed=${randomName()}`,
  ]);

  const handleSpriteChange = (e) => {
    setSelectedSprite(() => {
      if (e.target.value.length > 0) {
        setLoading(true);
        const imgData = [];
        for (let i = 0; i < 4; i++) {
          imgData.push(
            `https://api.dicebear.com/7.x/${
              e.target.value
            }/svg?seed=${randomName()}`
          );
        }

        setImgURL(imgData);
        setLoading(false);
      }

      return e.target.value;
    });
  };

  const regenerateAvatars = () => {
    setLoading(true);
    const imgData = [];
    for (let i = 0; i < 4; i++) {
      imgData.push(
        `https://api.dicebear.com/7.x/${selectedSprite}/svg?seed=${randomName()}`
      );
    }
    setImgURL(imgData);
    setLoading(false);
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      try {
        const { data } = await axios.post(`${setAvatarAPI}/${user._id}`, {
          image: imgURL[selectedAvatar],
        });

        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("user", JSON.stringify(user));
          toast.success("Avatar selected successfully", toastOptions);
          navigate("/");
        } else {
          toast.error("Error Setting avatar, Please Try again", toastOptions);
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.", toastOptions);
      } finally {
        setLoading(false);
      }
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <div className="avatar-page">
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
              value: 100,
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
              value: 0.5,
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
              speed: 1.5,
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
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

      <Container className="avatar-container">
        <div className="text-center avatar-header mb-4 d-flex justify-content-center align-items-center">
          <img
            src={munshiLogo}
            alt="Munshi"
            className="munshi-logo-small me-2"
          />
          <span className="munshi-brand">MUNSHI</span>
        </div>

        <Card className="avatar-card">
          <Card.Body>
            <div className="text-center mb-4">
              <h2 className="avatar-title">Choose Your Avatar</h2>
              <p className="text-muted">
                Select an avatar to personalize your profile
              </p>
            </div>

            {loading ? (
              <div className="text-center py-4">
                <img src={spinner} alt="Loading" width="80" />
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

                <div className="d-flex justify-content-between mb-3">
                  <Button
                    variant="outline-secondary"
                    onClick={regenerateAvatars}
                    disabled={loading}
                  >
                    Generate New Options
                  </Button>
                  <Button
                    variant="primary"
                    onClick={setProfilePicture}
                    disabled={loading || selectedAvatar === undefined}
                  >
                    {loading ? "Setting Avatar..." : "Set as Profile Picture"}
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>

      <ToastContainer />
    </div>
  );
};

export default SetAvatar;
