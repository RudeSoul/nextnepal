import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
} from "react-bootstrap";
import PageTitle from "../components/common/PageTitle";
import CardItem from "../components/common/CardItem";
import { getCookieLocationInfo } from "../utils/jscookies";
import FabSearch from "../components/fabSearch/index";
import { instance } from "../utils/axios/instance";

const FoodNBeverage = () => {
  const [restaurants, setrestaurants] = useState();

  useEffect(() => {
    let location = getCookieLocationInfo();
    if (location) {
      instance.post('get-filtered-restaurants', {
        category_ids: [8],
        latitude: location.latitude,
        longitude: location.longitude
      }).then(data => {
        setrestaurants(data.data);
      }).then(err => {
        console.log(err);
      });
    }
  }, []);

  return (
    <>
      <PageTitle
        title="Food &amp; Beverages"
        subTitle="Best food with quality and hygene. Bulk orders."
      />
      <section className="section pt-5 pb-5 products-listing">
        <Container>
          <Row>
            <Col md={12}>
              <Row>
                {
                  restaurants ?
                    restaurants.map((res) => (
                      <Col md={3} sm={6} className="mb-4 pb-2" key={res.id}>
                        <CardItem
                          title={res.name}
                          image={process.env.REACT_APP_D_URL + res.image}
                          imageAlt={res.name}
                          linkUrl={`/restaurant/${res.slug}`}
                          time={res.delivery_time}
                          price={res.price_range}
                          rating={res.rating}
                          imageClass='w-100'
                          subTitle={res.description}
                        />
                      </Col>
                    )) :
                    <Col md={{offset: 3, span: 6}}>
                      {/* <div className="d-flex justify-content-center align-items-center">
                        <Spinner animation="grow" ></Spinner>
                      </div> */}
                      <FabSearch setRes={setrestaurants} id={8}/>
                    </Col>
                }

                {/* <Col md={12} className="text-center load-more">
                  <Button variant="primary" type="button" disabled="">
                    <Spinner animation="grow" size="sm" className="mr-1" />
                    Loading...
                  </Button>
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default FoodNBeverage;
