import React from 'react';
import ProductBox from '../../components/home/ProductBox';
import { Col, Row, Container } from 'react-bootstrap';
import SectionHeading from '../../components/common/SectionHeading';

const ServicesList = () => {
  return (
    <section className='section pt-4 pb-4 products-section'>
      <Container fluid>
        <SectionHeading
          heading='Services'
          subHeading='Top restaurants, cafes, pubs, and bars in kathmandu, based on trends'
        />
        <Row>
          <Col className='offset-lg-1' lg={2} md={6} sm={6} xs={12}>
            <ProductBox
              image='img/services/1.jpg'
              imageClass='img-fluid rounded'
              imageAlt='product'
              title='Rental'
              linkUrl='services'
            />
          </Col>
          <Col lg={2} md={6} sm={6} xs={12}>
            <ProductBox
              image='img/services/2.jpg'
              imageClass='img-fluid rounded'
              imageAlt='product'
              title='Decoration'
              linkUrl='services'
            />
          </Col>
          <Col lg={2} md={6} sm={6} xs={12}>
            <ProductBox
              image='img/services/3.jpg'
              imageClass='img-fluid rounded'
              imageAlt='product'
              title='Entertainment'
              linkUrl='services'
            />
          </Col>
          <Col lg={2} md={6} sm={6} xs={12}>
            <ProductBox
              image='img/services/4.jpg'
              imageClass='img-fluid rounded'
              imageAlt='product'
              title='Photography'
              linkUrl='services'
            />
          </Col>
          <Col lg={2} md={6} sm={6} xs={12}>
            <ProductBox
              image='img/services/5.jpg'
              imageClass='img-fluid rounded'
              imageAlt='product'
              title='Videography'
              linkUrl='services'
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServicesList;
