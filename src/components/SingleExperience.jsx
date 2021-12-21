import { useState, useEffect } from "react";
import ExperiencePopUp from "./ExperiencePopUp";
import { useParams } from "react-router";
import { Card, Col, Row, Image } from "react-bootstrap";
import { Pencil } from "react-bootstrap-icons";
import "../CssStyles/Experience.css";

const SingleExperience = (props) => {
  const params = useParams();
  
  const [pressed, setPressed] = useState(false)
console.log({props})
  return (
    <>
      <Row id="experience-single-row">
        <Col xs={2} style={{display: "flex" , justifyContent: "center" , alignItems: "center"}}>
          {/* Image pre fixe and dynamic */}
          <Image src={props.img} style={{width:"60px" , height:"60px"}} />
          
        </Col>
        <Col xs={10}>
          <p style={{display:"flex" , justifyContent: "space-between"}}>
            {props.role}
            {
            params.id === "619234e538541a787a13c554" && 
            <div className="pencil" onClick={() => setPressed(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="black"
                class="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
              </svg>
            </div>
            }
          </p>
          <p>{props.company}</p>
          <p>{props.date}</p>
          <p>{props.area}</p>
          <p>{props.desc}</p>
        </Col>
      </Row>
      {pressed === true && (
        <ExperiencePopUp
          pressed={pressed}
          setPressed={setPressed}
          elementId={props.id}
          fetchUserExp={props.fetchUserExp}
        />
      )}
    <hr className="mt-1 mb-2" />
      
    </>
  );
};

export default SingleExperience;