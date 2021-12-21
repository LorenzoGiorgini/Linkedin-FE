import "@fortawesome/fontawesome-free/css/all.css";
import { Col, Row } from "react-bootstrap";
import PopUp from "./PopUp";
import { useParams } from "react-router";
import { useState , useEffect } from "react";
import ImageModal from "./ImageModal";

const Jumbo = (props) => {

  const params = useParams();
  const [imageModal, setImageModal] = useState(false)

  return (
    <div className="jumbo-container">
      <div className="img-bck-container">
        <div className="img-background"></div>
      </div>
      <div className="padding-jumbo">
        <div className="image-container">
          <div className="img-profile-container">
            <img className="img-profile" onClick={() => setImageModal(true)} src={props.user.image} />
          </div>
          {params.id == "619234e538541a787a13c554" && <ImageModal fetchUser={props.fetchUser} imageModal={imageModal} setImageModal={setImageModal} />}
          {params.id == "619234e538541a787a13c554" && <PopUp getExperience={props.getExperience} setGetExperience={props.setGetExperience} fetchUser={props.fetchUser} obj={props.user} />}
        </div>
        <Row>
          <Col md={8} className="color">
            <h1 className="font-big">
              {props.user.name} {props.user.surname}
            </h1>
            <div className="font-medium">{props.user.title}</div>
            <div className="font-medium">{props.user.bio}</div>
            <div className="d-flex flex-column">
              <span className="text-muted font-small">
                {props.user.area}{" "}
                <span className="contact-info font-small">Contact Info</span>{" "}
              </span>
              <span className="font-small connections">30 Connections</span>
            </div>
            <div className="d-flex">
              <div className="button-blue">Open To</div>
              <div className="button-transparent text-muted">Add Section</div>
              <div className="button-more text-muted">More</div>
            </div>
          </Col>
          <Col md={4} className="color">
            <div className="d-flex align-items-center">
              <img
                className="education-banner"
                src={
                  "https://media-exp1.licdn.com/dms/image/C4D0BAQFFQIjyDsOK0w/company-logo_200_200/0/1593351903670?e=2159024400&v=beta&t=3Apyi9gdHHpG2I_OafZnwPIUp5VatncZQiXoIp0QPlk"
                }
                alt=" "
              />
              <h2 className="font-small ml-2 connections">Strive School</h2>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Jumbo;