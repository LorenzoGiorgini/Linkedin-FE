import { Container, Row, Col } from "react-bootstrap";
import Jumbo from "../components/Jumbo";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ExperienceList from "../components/ExperienceList";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Profile = (props) => {
  const params = useParams();

  

  const [getExperience, setGetExperience] = useState([]);

  const [user, setUser] = useState(null);

  const fetchUser = async (id) => {
    try {
      let response = await fetch(
        "https://strive-linkedin.herokuapp.com/profile/" + id
      );
      let data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser(params.id);
  }, [params]);

  useEffect(() => {
    fetchUser(params.id);
  }, []);

  return (
    <>
    <NavBar/>
    <Container style={{ marginTop: "100px" }}>
      <Row>
        <Col md={8} style={{ height: "100%" }}>
          {user && <Jumbo getExperience={getExperience} setGetExperience={setGetExperience} fetchUser={fetchUser} user={user} />}
          {user && <ExperienceList getExperience={getExperience} setGetExperience={setGetExperience} user={user} />}
        </Col>

        <Col md={4}>
          <SideBar />
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
};

export default Profile;