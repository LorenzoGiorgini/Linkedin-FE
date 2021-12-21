import Dropdown from "react-bootstrap/Dropdown";
import "../CssStyles/Posts.css";
import { useEffect, useState } from "react";
import EditPostModule from "./EditPostModule";
import { Link } from "react-router-dom";
import AddComment from "./AddComment";
import { Row, Col } from "react-bootstrap";
import "../CssStyles/comments.css"
import EditComment from "./EditComment";

const SinglePost = (props) => {
  // console.log("This is element", props.element);

  const [comments, setComments] = useState([]);

  const [show, setShow] = useState(false);
  const [likes , setLikes] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://strive-linkedin.herokuapp.com/posts/${props.element._id}/comment`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        let array = await response.json();
        setComments(array.data);
        // console.log("This array of comments", array.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const deleteSelectedPost = async () => {
    try {
       let response = await fetch(
        `https://strive-linkedin.herokuapp.com/posts/${props.element._id}`,
        { method: "DELETE" }
      );
      props.fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };


  const fetchLikes = async () => {
    try {
      let response = await fetch(`https://strive-linkedin.herokuapp.com/posts/${props.element._id}/like`,
      {
        method: "POST",
        body: JSON.stringify({user: props.profile._id}),
        headers: {
          "Content-Type": "application/json",
        }
      }
      
      )
      if(response.ok){
        let data = await response.json()
        setLikes(data.data.likes.length)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className="container-post">
        <div className="padding-jumbo">
          <div className="row">
            <div className="image-container col-2 mt-3">
              <div className="img-profile-container">
                <img className="profile-img" src={props.element.user.image} />
              </div>
            </div>
            <div className="d-flex flex-column  mb-2 col-8 mt-3">
              <span className="span-big">
                {props.element.user.name} {props.element.user.surname}
              </span>
              <span className="span-small text-muted">
                {props.element.user.title}
              </span>

              <span className="span-small text-muted">
                {props.element.user.createdAt}
              </span>
            </div>
            <div className="col-2 mt-3">
              <Dropdown>
                <Dropdown.Toggle className="dropdown-styled">
                  <i class="bi bi-three-dots" style={{ fontSize: "25px" }}></i>
                </Dropdown.Toggle>
                {props.element.user._id === "619234e538541a787a13c554" ? (
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" onClick={handleShow}>
                      Modify
                    </Dropdown.Item>
                    <EditPostModule
                      show={show}
                      onHide={handleClose}
                      id={props.element._id}
                      fetchPosts={props.fetchPosts}
                      profile={props.profile}
                    />
                    <Dropdown.Item
                      href="#/action-2"
                      onClick={deleteSelectedPost}
                    >
                      Delete Post
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-1">Save</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Copy Link</Dropdown.Item>
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Save</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Copy Link</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Report</Dropdown.Item>
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </div>
          </div>
          <div className="post-description">{props.element.text}</div>
          {props.element.image && (
            <div>
              <img
                className="image-container"
                src={props.element.image}
                alt=" "
              />
            </div>
          )}
          <div className="translation">See Translation</div>
          <div>{likes}</div>
          <hr />
          <div className="d-flex justify-content-around">
            <span className="feed-buttons" onClick={fetchLikes}>
              <i class="bi bi-hand-thumbs-up mr-2"></i>Like
            </span>
            <span className="feed-buttons" style={{ cursor: "pointer" }}>
              <AddComment
                id={props.element._id}
                profile={props.profile}
                fetchComments={fetchComments}
              />
              Comment
            </span>
            <span className="feed-buttons">
              <i class="bi bi-share-fill mr-2"></i>
              Share
            </span>
            <span className="feed-buttons">
              <i class="bi bi-cursor-fill mr-2"></i>
              Send
            </span>
          </div>
        <div>
        {comments.length !== -1 &&
        comments.map((c) => (
          <div>
            < div className="row">
              <Col xs="1">
                 <img 
                    className="comment-image"
                    src={props.element.user.image}
                    style={{borderRadius: 50}}/> 
              </Col>
              <Col xs="11">
                <div className="ml-2 comment-box d-flex">
                  <div className="">
                    <div className="ml-2 py-0 comment-name"> 
                    {" "}
                    {props.element.user.name}
                    {" "}
                    {props.element.user.surname} {" "}
                  </div>
                  <div className="ml-2 py-0 comment-title text-muted">
                    {props.element.user.title} {" "}
                  </div>
                  <div className="ml-2 py-0 comment-text">{c.comment}</div>
                  </div>
                  <div className="d-flex ml-auto" style={{ cursor: "pointer" }}>
                    <EditComment
                    userId={props.element.user._id}
                    id={props.element._id}
                    commentId={c._id}
                    fetchComments={fetchComments}
                     />
                  </div>
                </div>
              </Col>
            </div>
          </div>
        ))}
        </div>
        </div>
      </div>
  );
};

export default SinglePost;