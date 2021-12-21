import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router";

const AddJobPosition = (props) => {
  const params = useParams();

  const [userExp, setUserExp] = useState({
    role: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    area: "",
  });

  const handleInput = (propertyName, value) => {
    setUserExp({
      ...userExp,
      [propertyName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userExp);

    try {
      let response = await fetch(
        "https://strive-linkedin.herokuapp.com/profile/619234e538541a787a13c554/experiences",
        {
          method: "POST",
          body: JSON.stringify(userExp),
          headers: {
            "Content-type": "application/json",
          }
        }
      );
      if (response.ok) {
        let data = await response.json();
        await submitFile(data.experiences.reverse()[0]);
        props.setShow(false);
        await fetchUserExp()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserExp = async () => {
    try {
      let response = await fetch(
        `https://strive-linkedin.herokuapp.com/profile/619234e538541a787a13c554/experiences`);
      if (response.ok) {
        let data = await response.json();
        props.setGetExperience(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [image, setImage] = useState(null);

  const TargetFile = (e) => {
    console.log("Event", e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const submitFile = async (id) => {
    let formData = new FormData();
    formData.append("image", image);
    try {
      let response = await fetch(
        `https://strive-linkedin.herokuapp.com/profile/619234e538541a787a13c554/experiences/${id}/picture`,
        {
          body: formData,
          method: "POST"
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        size="lg"
        show={props.show}
        onHide={() => props.setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add New Job
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title *</Form.Label>
              <Form.Control
                onChange={(e) => handleInput("role", e.target.value)}
                value={userExp.role}
                type="text"
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Company *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={userExp.company}
                onChange={(e) => handleInput("company", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="yyyy/mm/dd"
                value={userExp.startDate}
                onChange={(e) => handleInput("startDate", e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="yyyy/mm/dd"
                value={userExp.endDate}
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
                value={userExp.description}
                onChange={(e) => handleInput("description", e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Country/Region *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country/Region"
                value={userExp.area}
                onChange={(e) => handleInput("area", e.target.value)}
              />
            </Form.Group>
            <input type="file" onChange={TargetFile} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddJobPosition;
