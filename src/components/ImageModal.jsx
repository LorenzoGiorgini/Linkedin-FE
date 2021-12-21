import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router";
import { useRef } from "react";

const ImageModal = (props) => {
  const params = useParams();

  const handleClose = () => props.setImageModal(false);
  const handleShow = () => props.setImageModal(true);

  const [image, setImage] = useState(null);

  const TargetFile = (e) => {
    console.log("Event", e.target.files[0]);
    if (e.target && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const submitFile = async () => {
    try {
      let formData = new FormData();

      formData.append("image", image);
      let response = await fetch(
        "https://strive-linkedin.herokuapp.com/profile/619234e538541a787a13c554/picture",
        {
          body: formData,
          method: "POST",
        }
      );
      console.log(response);
      props.fetchUser(params.id);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const inputBtn = useRef();

  const openInputFile = () => {
    inputBtn.current.click();
  };

  return (
    <Modal show={props.imageModal} onHide={handleClose}>
      <div className="modal-content">
      <Modal.Header closeButton>
        <Modal.Title>Add photo</Modal.Title>
      </Modal.Header>
      <div className="image-modal">
        <Modal.Body>
          <div class="d-flex flex-column justify-content-center align-items-center">
            <div>
              <p>
                No professional headshot needed!
              </p>
              <p>
                Just something that represents you.
              </p>
            </div>

            <img
              src="https://static-exp1.licdn.com/sc/h/c5ybm82ti04zuasz2a0ubx7bu"
              alt="Example profile photos"
            />

            <p className="text-muted">
              Take or upload a photo. Then crop, filter and adjust it to
              perfection.
            </p>
          </div>
        </Modal.Body>
      </div>
      <Modal.Footer>
        <div className="button-inerit" style={{width:"120px" , height:"32px"}}  onClick={() => openInputFile()} >Pick Image</div>
        <input
          type="file"
          ref={inputBtn}
          className="upload-file"
          onChange={TargetFile}
        />
        <div className="button-blue" style={{width:"120px" , height:"32px"}} onClick={submitFile}>Save Changes</div>
      </Modal.Footer>
      </div>
    </Modal>
  );
};

export default ImageModal;
