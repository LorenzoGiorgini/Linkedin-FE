import React from "react"
import {Modal, Button, Row, Col, Form} from "react-bootstrap"
import { useState } from "react"
import {FaRegCommentDots} from "react-icons/fa"

export default function EditComment({
    fetchComments,
    id,
    commentId,
    userId
})
{
const [show, setShow] = useState(false)
const handleClose = () => setShow(false)
const handleShow = () => setShow(true)

const [EditToComment, setEditToComment] = useState({
    comment: "",
    userId: userId,
    id: id,
    commentId: commentId
})

const dataSet = (valname, valdata) => {
    setEditToComment({...EditToComment, [valname]: valdata})
}

const sendData = (e) => {
    e.preventDefault()
    editComment()
    handleClose()
}

const deleteFunc = (e) => {
    e.preventDefault();
    deleteComment();
    handleClose()
    fetchComments()
}

const editComment = async () => {
    try {
        let response = await fetch(
            `https://strive-linkedin.herokuapp.com/posts/${id}/comment/${commentId}`,
            {
                method: "PUT",
                body: JSON.stringify(EditToComment),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        )
        if(response.ok){
            let data = await response.json()
            fetchComments()
        }else{
            console.log("error")
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteComment = async () => {
    try {
        let response = await fetch(
            `https://strive-linkedin.herokuapp.com/posts/${id}/comment/${commentId}`,
            {
                method: "DELETE",
                body: JSON.stringify(EditToComment),
                headers: {
                    "Content-type": "application/json;"
                },
            }
        ) 
        if(response.ok){
            let data = await response.json()
            fetchComments()
        }else{
            console.log("error")
        }
    } catch (error) {
        console.log(error)
    }
}

    return (
        <>
        <p onClick={handleShow}>Edit</p>
        <Modal className="modalEditComment" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => sendData(e)}>
        <Modal.Body>
            <Row>
                <Col>
                <Form.Group>
                    <Form.Control
                    type="text"
                    value={Comment.comment}
                    onChange={(e) => dataSet("comment", e.target.value)}
                    />
                </Form.Group>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
        <Row>
                <Col>
                <Button
                variant="light"
                className="mr-auto"
                onClick={(e) => deleteFunc(e)}
                >Delete</Button>
                </Col>
            </Row>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
        
        </>
    )



}

