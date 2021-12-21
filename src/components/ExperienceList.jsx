import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import SingleExperience from "./SingleExperience";
import { useParams } from "react-router";
import { Plus } from "react-bootstrap-icons";

const ExperienceList = (props) => {

  
  const params = useParams();
  
  const fetchUserExp = async () => {
    try {
      let response = await fetch(`https://strive-linkedin.herokuapp.com/profile/${props.user._id}/experiences`);
      if (response.ok) {
        let data = await response.json();
        props.setGetExperience(data.experiences);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserExp();
  }, [props.user._id]);

  return (
    props.getExperience.length > 0 && (
      <>
        <Row md={8} className="experience-list-con mr-0 ml-0">
          <Col>
          
          
              <Col>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 style={{fontSize: "20px"}}>Experience</h2>
                {params.id === "619234e538541a787a13c554" && <Plus id="plus-icon" style={{fontSize:"35px"}} />}
              </div>
              {props.getExperience.map((element) => (
                <SingleExperience
                  user={props.user}
                  role={element.role}
                  location={element.area}
                  date={element.startDate}
                  company={element.company}
                  desc={element.description}
                  img={element.image}
                  id={element._id}
                  fetchUserExp={fetchUserExp}
                />
                ))}
              </Col>
          
          </Col>
        </Row>
      </>
    )
  );
};

export default ExperienceList;