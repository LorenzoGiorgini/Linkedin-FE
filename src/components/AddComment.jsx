import React from "react"
import {Modal, Button, Row, Col, Form} from "react-bootstrap"
import {useState, useEffect} from "react"
import {FaRegCommentDots} from "react-icons/fa"

export default function AddComment({fetchComments, id, profile}) {
 const [show, setShow] = useState(false)
 const handleClose = () => setShow(false)
 const handleShow = () => setShow(true)

 useEffect( () => {} , [])

 const [Comment, setComment] = useState({
    comment: "",
    user: profile._id
 })

 const sendComments = (e) => {
     e.preventDefault()
     addComment()
     handleClose()
 }
 const commentSet = (valname, valdata) => {
     setComment({...Comment, user: profile._id, [valname]: valdata })
 }
 const addComment = async () => {
try {
    const response = await fetch(
        `https://strive-linkedin.herokuapp.com/posts/${id}/comment`,
        {
            method: "POST",
            body: JSON.stringify(Comment),
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
    if(response.ok) {
        let comments = await response.json()
        fetchComments()
    }
} catch (error) {
    console.log(`Error ${error}`)
}
 }

return(
    <>
<FaRegCommentDots size={20} onClick={handleShow} />
<Modal className="modalEditInfo" show={show} onHide={handleClose}>
  <Modal.Header className="font-weight-light" closeButton>
    <Modal.Title className="font-weight-light">Add Comment</Modal.Title>
  </Modal.Header>
  <Form onSubmit={(e) => sendComments(e)}>
    <Modal.Body className="p-4">
      <Row>
        <Col xs="12">
          <Form.Group controlId="formHeadLine">
            <Form.Control
              type="text"
              value={Comment.comment}
              onChange={(e) => commentSet("comment", e.target.value)}
              placeholder="Comment"
            />
          </Form.Group>
        </Col>
        <Col xs="12"></Col>
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" type="submit">
        Save
      </Button>
    </Modal.Footer>
  </Form>
</Modal>

    </>
)




}