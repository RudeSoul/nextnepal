import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PageTitle from "../components/common/PageTitle";
import CardItem from "../components/common/CardItem";
import { getCookieLocationInfo } from "../utils/jscookies";
import FabSearch from "../components/fabSearch/index";
import FabSearchService from "../components/fabSearch/FabSearchService";

import { instance } from "../utils/axios/instance";

import ServicesList from "./Home/ServicesList";
const Services = () => {
  const [services, setServices] = useState();

  useEffect(() => {
    let location = getCookieLocationInfo();
    if (location) {
      instance
        .post("get-store-services", {
          category_ids: [10],
          latitude: location.latitude,
          longitude: location.longitude,
        })
        .then((data) => {
          setServices(data.data);
        })
        .then((err) => {
          alert("there is some error, Please contact our customer place");
        });
    }
  }, []);

  return (
    <>
      <PageTitle
        title="Services"
        subTitle="Find out Top services available at same place"
      />

      <section className="section pt-5 pb-5 products-listing">
        <Container>
          <Row>
            <Col md={12}>
              <Row>
                {services ? (
                  services.map((res) => (
                    <Col md={3} sm={6} className="mb-4 pb-2" key={res.id}>
                      <CardItem
                        title={res.name}
                        image={process.env.REACT_APP_D_URL + res.image}
                        imageAlt={res.name}
                        linkUrl={`/services/${res.slug}`}
                        time={res.delivery_time}
                        price={res.price_range}
                        rating={res.rating}
                        imageClass="w-100"
                        subTitle={res.description}
                      />
                    </Col>
                  ))
                ) : (
                  <Col md={{ offset: 3, span: 6 }}>
                    <FabSearch setRes={setServices} id={18} />

                    <FabSearchService />
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* <ServicesList /> */}
    </>
  );
};

export default Services;
