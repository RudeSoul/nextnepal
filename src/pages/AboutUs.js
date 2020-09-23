import React, { Component } from "react";
import PageTitle from "../components/common/PageTitle";
import { Row, Container, Col, Image } from "react-bootstrap";
import SectionHeading from "../components/common/SectionHeading";
import "./stylesheet/aboutus_helper.css";

export default class AboutUs extends Component {
  render() {
    return (
      <>
        <PageTitle
          title="About Wedding Nepal"
          subTitle="Catering, Wedding Services, Photography, Videography etc.... "
        />
        <section className="section pt-4 pb-4">
          <Container>
            <SectionHeading
              heading="Weclome to Wedding Nepal"
              subHeading={
                "We have handle more than 1000's of projects all over the Nepal."
              }
            />
            <Row>
              <Col md={6} lg={3}>
                <div className="about-img">
                  <Image src="./img/fab/1.jpg" className="w-100" />
                </div>
              </Col>
              <Col md={6} lg={3}>
                <div className="about-img">
                  <Image src="./img/fab/2.jpg" className="w-100" />
                </div>
              </Col>
              <Col md={6} lg={3}>
                <div className="about-img">
                  <Image src="./img/fab/3.jpg" className="w-100" />
                </div>
              </Col>
              <Col md={6} lg={3} className="about-img">
                <div className="l">
                  <Image src="./img/fab/4.jpg" className="about-img__holder" />
                </div>
              </Col>
            </Row>
            <Row className="h-aboutus-services">
              <Col md={6} className="my-3">
                <h5>Catering Nepal</h5>
                <p>
                  We have years of experience in catering services for corporate
                  functions as well as wedding parties, private parties and
                  outdoor events of different sizes in Hong Kong. Whatever the
                  event we are committed to make every effort in customizing
                  menus for customers special requests and needs.
                </p>
              </Col>
              <Col md={6} className="my-3">
                <h5>FoodDelivery App</h5>
                <p>
                  Our Food delivery app helps you find and order food from
                  wherever you are you type in an address, we tell you the
                  restaurants that deliver to that locale as well as showing you
                  droves of pickup restaurants near you, we also give you access
                  to reviews, coupons, special deals and a 24/7 customer care
                  team that tracks each order and makes sure you get exactly
                  what you want.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}
