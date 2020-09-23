import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
} from "react-bootstrap";
import PageTitle from "../components/common/PageTitle";
import CardItem from "../components/common/CardItem";
import { getCookieLocationInfo } from "../utils/jscookies";
import { getDeliveryRestaurants } from "../utils/axios/location";
import FabSearch from "../components/fabSearch/index";

const List = () => {
  const [restaurants, setrestaurants] = useState();

  useEffect(() => {
    let location = getCookieLocationInfo();
    if (location) {
      (async () => {
        let res = await getDeliveryRestaurants(
          location.latitude,
          location.longitude
        );
        setrestaurants(res);
      })();
    }
  }, []);

  return (
    <>
      <PageTitle
        title="Everything you need is here."
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
                    <Col sm={{offset: 3, span: 6}}>
                      <FabSearch setRes={setrestaurants}/>
                    </Col>
                }
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default List;
