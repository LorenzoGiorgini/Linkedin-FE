import { Col, Container, Row } from "react-bootstrap";
import ExistingPosts from "../components/ExistingPosts";
import NewPost from "../components/NewPost";
import { useState, useEffect } from "react";
import LeftSideBarCardProfile from "../leftSideBarHome/LeftSideBarCardProfile";
import RightSideBar from "../rightSideBarHome/RightSideBar";
import NavBar from "../components/NavBar";
import SmallFooter from "../components/SmallFooter";

const Profile = (props) => {
  const [posts, setPosts] = useState([]);

  const [profile, setProfile] = useState([]);

  const fetchPosts = async () => {
    try {
      let response = await fetch(
        `https://strive-linkedin.herokuapp.com/posts/`
      );

      if (response.ok) {
        let data = await response.json();
        setPosts(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      let response = await fetch(
        `https://strive-linkedin.herokuapp.com/profile/619234e538541a787a13c554`
      );
      if (response.ok) {
        let data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchProfile();
  }, []);

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "100px" }}>
        <Row>
          <Col xs={12} md={4} lg={2} style={{ height: "100%" }}>
            <LeftSideBarCardProfile profile={profile} />
          </Col>
          <Col xs={12} md={8} lg={6} style={{ height: "100%" }}>
            <NewPost profile={profile} posts={posts} fetchPosts={fetchPosts} />
            <ExistingPosts
              profile={profile}
              posts={posts}
              fetchPosts={fetchPosts}
            />
            <div className="d-xs-block d-sm-block d-md-block d-lg-none">
              <RightSideBar />
              <SmallFooter />
            </div>
            </Col>

          <Col
            md={4}
            className="d-none d-xs-none d-sm-none d-md-none d-lg-block h-100"
          >
            <RightSideBar />
            <SmallFooter />
          </Col>
          
        </Row>
      </Container>
    </>
  );
};


export default Profile;