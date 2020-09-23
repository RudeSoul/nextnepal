import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import TopSearch from "../../components/home/TopSearch";
import SectionHeading from "../../components/common/SectionHeading";
import FontAwesome from "../../components/common/FontAwesome";
import FoodBeverage from "./FoodBeverage";
import ServicesList from "./ServicesList";

const Home = () => {
  return (
    <React.Fragment>
      <TopSearch />
      <FoodBeverage />
      <ServicesList />
      <section className="section pt-5 pb-5 bg-white becomemember-section border-bottom">
        <Container>
          <SectionHeading
            heading="Become a Member"
            subHeading="Lorem Ipsum is simply dummy text of"
          />
          <Row>
            <Col sm={12} className="text-center">
              <Link to="register" className="btn btn-primary btn-lg">
                Create an Account <FontAwesome icon="chevron-circle-right" />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Home;
