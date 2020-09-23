import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SectionHeading from "../../components/common/SectionHeading";
import ProductBox from "../../components/home/ProductBox";

const FoodBeverage = () => {
  return (
    <section className="section pt-4 pb-4 bg-white homepage-add-section">
      <Container fluid>
        <SectionHeading
          heading="Food &amp; Beverages"
          subHeading="Varieties of food items and different continental cuisine."
        />
        <Row>
          <Col className="offset-lg-1" lg={2} md={6} sm={6} xs={12}>
            <ProductBox
              image="./../../assets/img/fab/1.jpg"
              imageClass="img-fluid rounded"
              imageAlt="product"
              title="Breakfast"
              linkUrl="food-and-beverage"
            />
          </Col>
          <Col lg={2} md={6} sm={6} xs={12}>
            <ProductBox
              image="img/fab/2.jpg"
              imageClass="img-fluid rounded"
              imageAlt="product"
              title="Lunch"
              linkUrl="food-and-beverage"
            />
          </Col>
          <Col lg={2} md={6} sm={6} xs={12}>
            <ProductBox
              image="img/fab/3.jpg"
              imageClass="img-fluid rounded"
              imageAlt="product"
              title="Tiffin"
              linkUrl="food-and-beverage"
            />
          </Col>
          <Col lg={2} md={6} sm={6} xs={12}>
            <ProductBox
              image="img/fab/4.jpg"
              imageClass="img-fluid rounded"
              imageAlt="product"
              title="Snacks"
              linkUrl="food-and-beverage"
            />
          </Col>
          <Col lg={2} md={6} sm={6} xs={12}>
            <ProductBox
              image="img/fab/5.jpg"
              imageClass="img-fluid rounded"
              imageAlt="product"
              title="Dinner"
              linkUrl="food-and-beverage"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FoodBeverage;
