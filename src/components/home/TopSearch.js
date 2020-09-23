import React, { useEffect, useState } from "react";
import { Row, Col, Container, Badge } from "react-bootstrap";
// import HomeBanner from "../../assets/img/banner/1.jpg";
import HomeBanner from "../../assets/img/1.jpg";
import CategoriesCarousel from "../common/CategoriesCarousel";
import SearchForm from "./SearchForm/index";
import { getPopularLocation } from "../../utils/axios/location";
import { setCookieLocationInfo } from "../../utils/jscookies";
import { useHistory } from "react-router";

const TopSearch = () => {
  const [popular, setpopular] = useState();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      let location = await getPopularLocation();
      setpopular(location);
    })();
  }, []);

  const handlePopular = (lat, lng, address) => {
    setCookieLocationInfo({
      latitude: lat,
      longitude: lng,
      address: address,
    });
    history.push("/listing");
  };

  return (
    <section
      className="pt-5 pb-5 homepage-search-block position-relative"
      style={{
        background: `url('${HomeBanner}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="banner-overlay"></div>
      <Container>
        <Row className="d-flex align-items-center">
          <Col md={8} className="text-center offset-md-2">
            <div className="homepage-search-title">
              <h1 className="mb-2 text-white font-weight-normal">
                <span className="font-weight-bold">Find Awesome Deals</span> in
                Nepal
              </h1>
              <h5 className="mb-5 text-white font-weight-normal">
                Lists of top restaurants, cafes, pubs, and bars in Nepal, based
                on trends
              </h5>
            </div>

            {/* Search Location Form */}
            <SearchForm />
            {/* <h6 className="mt-4 text-shadow text-white font-weight-normal">
              E.g. Beverages, Pizzas, Chinese, Bakery, Indian...
            </h6> */}
            {/* Search Location Form */}

            <h4 className="text-white">POPULAR LOCATION</h4>
            <div className="d-flex justify-content-center mb-4">
              {popular &&
                popular.map((p) => (
                  <h4 className="mr-2" key={p.id}>
                    <Badge
                      className="popular-badge"
                      size="lg"
                      variant="primary"
                      onClick={() =>
                        handlePopular(p.latitude, p.longitude, p.name)
                      }
                    >
                      {p.name}
                    </Badge>
                  </h4>
                ))}
              {/* 
              <h4 className="mr-2">
                <Badge size="lg" variant="primary">
                  Lalitpur
                </Badge>
              </h4>
              <h4>
                <Badge size="lg" variant="primary">
                  Bhaktapur
                </Badge>
              </h4> */}
            </div>
            <CategoriesCarousel />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TopSearch;
