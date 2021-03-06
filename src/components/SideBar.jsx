import { useEffect, useState } from "react";
import { Col, Row, Container, Button, Image } from "react-bootstrap";
import Advertisement from "../assets/advertisement.jpg";
import "../CssStyles/SideBar.css";

// fontawesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faQuestionCircle , faAlicorn } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Sidebar = (props) => {
  const history = useHistory();

  const [profiles, setProfiles] = useState([]);

  const fetchData = async () => {
    try {
      let response = await fetch(
        "https://strive-linkedin.herokuapp.com/profile/"
        
      );
      
      let data = await response.json();

      console.log(data)
      setProfiles(data.slice(0, 5));
    } catch (error) {
      console.log(error, "Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Container>
        {/* Main section of SideBar */}
        <Row>
          {/*  Side bar start */}
          <Col xs={12} className="sidebar-container p-0">
            {/* edit-public-language section */}
            <div className="edit-public-language-container pb-1">
              {/* edit public profile */}
              <div className="d-flex justify-content-between m-2">
                <span className="edit-text ml-3">
                  {" "}
                  Edit Public profile and url
                </span>
                <FontAwesomeIcon
                  className="button-icon question-icon ml-auto mr-3"
                  icon={faQuestionCircle}
                />
                <div>{""}</div>
              </div>
              <hr/>
              <div className="d-flex justify-content-between m-2">
                <span className="edit-text ml-3">
                  {" "}
                  Add profile in another language
                </span>
                <FontAwesomeIcon
                  className="button-icon question-icon ml-auto mr-3"
                  icon={faQuestionCircle}
                />
                <div>{""}</div>
              </div>
                <hr/>
              {/* add profile in another language  */}
              <div className="sidebar-btn mt-2 mb-2 d-flex justify-content-between align-items-center">
                  <div className="ml-3">
                    <Button
                      className="rounded-pill btn-sm long-btn pl-2"
                      variant="primary"
                    >
                      English
                    </Button>{" "}
                    <Button
                      className="rounded-pill btn-sm long-btn"
                      variant="outline-dark"
                    >
                      {" "}
                      Italiano
                    </Button>
                  </div>
                  <FontAwesomeIcon
                    className="button-icon globe-icon ml-auto mr-4"
                    icon={faGlobe}
                  />
                </div>
            </div>

            <div className="edit-public-language-container d-flex justify-content-center p-0">
              <div className="advertisement">
                <Image
                  src={Advertisement}
                  fluid
                />
              </div>
            </div>
            

            {/* People you may know */}
            <div className="people pt-3 ">
            <span className="pl-3 pb-3 text">People you may know</span>
              <div className="pl-3 pt-2">
                {/* Loading profiles from fetched data */}
                {profiles.map((profile) => (
                  <div key={profile._id}>
                    <div className="d-flex">
                      {/* Images */}
                      <Image
                        className="img-circle mt-1"
                        style={{width: "48px" , height: "48px"}}
                        src={profile.image}
                        alt="Linkedin Member"
                        fluid
                        roundedCircle
                      ></Image>

                      {/* Name & Surname */}
                      <div className="profile-details ml-4 mb-2">
                        <Link to={"/profile/" + profile._id}>
                          <div
                            className="profile-name"
                            onClick={() => {
                              history.push(`/profile/${profile._id}`);
                            }}
                          >
                            {profile.name} {profile.surname}
                          </div>
                        </Link>

                        {/* Title */}
                        <div className="profile-title">{profile.title}</div>

                        {/* Connect */}
                        <div className="profile-message">
                          <Button
                            className="rounded-pill btn-sm"
                            variant="outline-dark"
                          >
                            Connect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Sidebar;

// Emilian's Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTYzZjg0NWE4OTBjYzAwMTVjZjA3ZWEiLCJpYXQiOjE2MzM5NDE1NzQsImV4cCI6MTYzNTE1MTE3NH0.l0p-bV1Pw_UsfkiDzTx5nS4PTO6diKdzQCQWqrHyars