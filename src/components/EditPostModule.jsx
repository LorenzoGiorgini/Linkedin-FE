import { useState, useEffect } from "react";
import { Form, Modal } from "react-bootstrap";

const EditPostModule = ({ show, onHide, id , fetchPosts , profile }) => {

const [post, setPost] = useState([])

  const fetchSinglePost = async () => {
    try {
      let response = await fetch(`https://strive-linkedin.herokuapp.com/posts/${id}`);
      if (response.ok) {
        let data = await response.json();

        setPost(data);
      }
    } catch (error) {
      console.log(error);
    }
  }


  const editSelectedPost = async () => {
        
    
    try {
      let response = await fetch(
        `https://strive-linkedin.herokuapp.com/posts/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(post),
          headers: {
            "Content-type": "application/json"
          }
        }
      )
      onHide()
      fetchPosts()
    } catch (error) {
      console.log(error)
    }
  }

  const handleInput = (propertyName, value) => {
    setPost({
        ...post,
        [propertyName]: value
    })
}

  useEffect(() => {
    fetchSinglePost();
  }, []);

  return (
    
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create a post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center mb-3 profile-image-container">
            <img src={profile.image} alt="profile" className="profile-img mr-3"></img>
            <h5>{profile.name}{" "}{profile.surname}</h5>
          </div>
          <Form
            id="post-form"
            className="w-100"
            onSubmit={(e) => {
              e.preventDefault();

              onHide();
            }}
          >
            <Form.Group
              className="mb-3 post-text"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="What do you want to talk about"
                value={post.text} 
                onChange={e => handleInput('text', e.target.value)}
              
                
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control className="d-none" id="file-input" type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <div className="button-blue" style={{color:"white"}} onClick={editSelectedPost}>Save</div>
        </Modal.Footer>
      </Modal>
    </>
  );
};


export default EditPostModule