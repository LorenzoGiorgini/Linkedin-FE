import { Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

const ExperiencePopUp = (props) => {
  const params = useParams();

  const [closePop, setclosePop] = useState(props.pressed);
  const [jobobj, setJobObj] = useState([]);

  const handleInput = (propertyName, value) => {
    setJobObj({
      ...jobobj,
      [propertyName]: value,
    });
  };

  const fetchSelectedJob = async () => {
    try {
      let response = await fetch(
        `https://strive-linkedin.herokuapp.com/profile/me/experiences/${props.elementId}`,
        {
          method: "GET"
        }
      );
      if(response.ok) {
        let data = await response.json();
        setJobObj(data);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSelectedJob = async () => {
    try {
      let response = await fetch(
        `https://strive-linkedin.herokuapp.com/profile/me/experiences/${props.elementId}`,
        {
          method: "DELETE"
        }
      );
      props.fetchUserExp(params.id);
    } catch (error) {
      console.log(error);
    }
  };

  const editSelectedJob = async () => {
    try {
      let response = await fetch(
        `https://strive-linkedin.herokuapp.com/profile/me/experiences/${props.elementId}`,
        {
          method: "PUT",
          body: JSON.stringify(jobobj),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if(response.ok) {
        submitFile(jobobj._id)

      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSelectedJob();
  }, [props.pressed]);

  const [image, setImage] = useState(null);

  const TargetFile = (e) => {
    console.log("Event", e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const submitFile = async (id) => {
    try {

      let formData = new FormData();

      formData.append("experience", image);
      let response = await fetch(
        `https://strive-linkedin.herokuapp.com/profile/616434dda890cc0015cf07f0/experiences/${id}/picture`,
        {
          body: formData,
          method: "POST"
        }
      );
      console.log(response);
      props.fetchUserExp(params.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.pressed}
        onHide={() => props.setPressed(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit intro
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title *</Form.Label>
              <Form.Control
                onChange={(e) => handleInput("role", e.target.value)}
                value={jobobj.role}
                type="text"
                placeholder="Enter your role at the company"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter company name"
                value={jobobj.company}
                onChange={(e) => handleInput("company", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="yyyy/mm/dd"
                value={jobobj.startDate}
                onChange={(e) => handleInput("startDate", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="yyyy/mm/dd"
                value={jobobj.endDate}
                onChange={(e) => handleInput("endDate", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                rows={5}
                placeholder="Change the description"
                value={jobobj.description}
                onChange={(e) => handleInput("description", e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Country/Region *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country/Region"
                value={jobobj.area}
                onChange={(e) => handleInput("area", e.target.value)}
              />
            </Form.Group>
                <input type="file" onChange={TargetFile}/>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteSelectedJob}>
            X
          </Button>

          <Button variant="primary" onClick={editSelectedJob}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExperiencePopUp;
