import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Tab,
  Nav,
  Image,
  Badge,
  Card,
} from "react-bootstrap";
// import GalleryCarousel from '../components/common/GalleryCarousel';
import CheckoutItem from "../components/common/CheckoutItem";
import QuickBite from "../components/common/QuickBite";
import StarRating from "../components/common/StarRating";
import RatingBar from "../components/common/RatingBar";
import Review from "../components/common/Review";
import Icofont from "react-icofont";
import { getResInfo } from "../utils/axios/location";
import { getCookieaccountinfo, setCookieCart } from "../utils/jscookies";
import { connect } from "react-redux";

class Detail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddressModal: false,
      users: [
        {
          name: "Osahan Singh",
          image: "/img/user/5.png",
          url: "#",
        },
        {
          name: "Gurdeep Osahan",
          image: "/img/user/2.png",
          url: "#",
        },
        {
          name: "Askbootstrap",
          image: "/img/user/3.png",
          url: "#",
        },
        {
          name: "Osahan Singh",
          image: "/img/user/4.png",
          url: "#",
        },
      ],
      res: {},
      items: [],
      recommended: [],
      total: 0,
    };
  }

  hideAddressModal = () => this.setState({ showAddressModal: false });

  componentDidMount() {
    const getRes = async () => {
      let data = await getResInfo(this.props.match.params.slug);
      this.setState({
        res: { ...data.info },
        items: { ...data.item.items },
        recommended: [...data.item.recommended],
      });
      // console.log(data);
    };
    getRes();
  }

  handleCheckout = (e) => {
    e.preventDefault();
    let userInfo = getCookieaccountinfo();
    console.log("cookies userInfo :->", userInfo);
    let cart = { products: this.props.cart, total: this.props.total };
    setCookieCart(cart);
    if (userInfo) {
      window.location.href = "/checkout";
    } else {
      window.location.href = "/login";
    }
  };

  render() {
    console.log(this.props.cart);
    return (
      <>
        <section className="restaurant-detailed-banner">
          <div className="text-center">
            <Image
              fluid
              className="cover"
              src={
                this.state.res.banner_image
                  ? process.env.REACT_APP_IMAGE_URL +
                    this.state.res.banner_image
                  : "/img/mall-dedicated-banner.jpg"
              }
            />
          </div>
          <div className="restaurant-detailed-header">
            <Container>
              <Row className="d-flex align-items-end">
                <Col md={8}>
                  <div className="restaurant-detailed-header-left">
                    <Image
                      fluid
                      className="mr-3 float-left"
                      alt="osahan"
                      src={
                        process.env.REACT_APP_IMAGE_URL + this.state.res.image
                      }
                    />
                    <h2 className="text-white">{this.state.res.name}</h2>
                    <p className="text-white mb-1">
                      <Icofont icon="location-pin" /> {this.state.res.address}
                      <Badge variant="success">
                        {this.state.res.is_active ? "OPEN" : "CLOSED"}
                      </Badge>
                    </p>
                    <p className="text-white mb-0">
                      <Icofont icon="food-cart" /> {this.state.res.description}
                    </p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="restaurant-detailed-header-right text-right">
                    <Button variant="success" type="button">
                      <Icofont icon="clock-time" />{" "}
                      {this.state.res.delivery_time} min
                    </Button>
                    <h6 className="text-white mb-0 restaurant-detailed-ratings">
                      <span className="generator-bg rounded text-white">
                        <Icofont icon="star" /> {this.state.res.rating}
                      </span>{" "}
                      23 Ratings
                      <Icofont icon="speech-comments" className="ml-3" /> 91
                      reviews
                    </h6>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>

        <Tab.Container defaultActiveKey="first">
          <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
            <Container>
              <Row>
                <Col md={12}>
                  <Nav id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Order Online</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Restaurant Info</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fourth">Book A Table</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="fifth">Ratings & Reviews</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>
            </Container>
          </section>
          <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
            <Container>
              <Row>
                <Col md={8}>
                  <div className="offer-dedicated-body-left">
                    <Tab.Content className="h-100">
                      <Tab.Pane eventKey="first">
                        {/* <h5 className="mb-4">Recommended</h5> */}
                        {/* <Form className="explore-outlets-search mb-4">
													<InputGroup>
														<Form.Control type="text" placeholder="Search for dishes..." />
														<InputGroup.Append>
															<Button type="button" variant="link">
																<Icofont icon="search" />
															</Button>
														</InputGroup.Append>
													</InputGroup>
												</Form>
												<h6 className="mb-3">Most Popular  <Badge variant="success">	<Icofont icon="tags" /> 15% Off All Items </Badge></h6>
												<ItemsCarousel /> */}

                        <Row>
                          <h5 className="mb-4 mt-3 col-md-12">
                            Recommended{" "}
                            <small className="h6 text-black-50">
                              {this.state.recommended.length} ITEMS
                            </small>
                          </h5>
                          <Col md={12}>
                            <div className="bg-white rounded border shadow-sm mb-4">
                              {this.state.recommended.map((rec) => (
                                <QuickBite
                                  key={rec.id}
                                  id={rec.id}
                                  itemClass="menu-list"
                                  title={rec.name}
                                  image={
                                    rec.image
                                      ? process.env.REACT_APP_IMAGE_URL +
                                        rec.image
                                      : null
                                  }
                                  price={parseInt(rec.price)}
                                  priceUnit="Rs."
                                  items={rec}
                                  is_new={rec.is_new}
                                  is_popular={rec.is_popular}
                                  is_recommended={rec.is_recommended}
                                  is_veg={rec.is_veg}
                                  is_active={rec.is_active}
                                />
                              ))}
                            </div>
                          </Col>
                        </Row>
                        {Object.keys(this.state.items).map((key) => (
                          <Row key={key}>
                            <h5 className="mb-4 mt-3 col-md-12">
                              {key}{" "}
                              <small className="h6 text-black-50">
                                {this.state.items[key].length} ITEMS
                              </small>
                            </h5>
                            <Col md={12}>
                              <div className="bg-white rounded border shadow-sm mb-4">
                                {this.state.items[key].map((itm) => (
                                  <QuickBite
                                    key={itm.id}
                                    id={itm.id}
                                    itemClass="menu-list"
                                    image={
                                      itm.image
                                        ? process.env.REACT_APP_IMAGE_URL +
                                          itm.image
                                        : "img/1.jpg"
                                    }
                                    title={itm.name}
                                    price={parseInt(itm.price)}
                                    priceUnit="Rs."
                                    items={itm}
                                  />
                                ))}
                              </div>
                            </Col>
                          </Row>
                        ))}
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <div
                          id="restaurant-info"
                          className="bg-white rounded shadow-sm p-4 mb-4"
                        >
                          <div className="address-map float-right ml-5">
                            <div className="mapouter">
                              <div className="gmap_canvas">
                                <iframe
                                  title="addressMap"
                                  width="300"
                                  height="170"
                                  id="gmap_canvas"
                                  src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=9&ie=UTF8&iwloc=&output=embed"
                                  frameBorder="0"
                                  scrolling="no"
                                  marginHeight="0"
                                  marginWidth="0"
                                ></iframe>
                              </div>
                            </div>
                          </div>
                          <h5 className="mb-4">Restaurant Info</h5>
                          <p className="mb-3">
                            {this.state.res.address}, {this.state.res.pincode}
                          </p>
                          <p className="mb-2 text-black">
                            <Icofont icon="phone-circle text-primary mr-2" />{" "}
                            +91 01234-56789, +91 01234-56789
                          </p>
                          <p className="mb-2 text-black">
                            <Icofont icon="email text-primary mr-2" />{" "}
                            iamosahan@gmail.com, osahaneat@gmail.com
                          </p>
                          <p className="mb-2 text-black">
                            <Icofont icon="clock-time text-primary mr-2" />{" "}
                            Today 11am – 5pm, 6pm – 11pm
                            <Badge variant="success" className="ml-1">
                              {" "}
                              OPEN NOW{" "}
                            </Badge>
                          </p>
                          <hr className="clearfix" />
                          <p className="text-black mb-0">
                            You can also check the 3D view by using our menue
                            map clicking here &nbsp;&nbsp;&nbsp;{" "}
                            <Link className="text-info font-weight-bold" to="#">
                              Venue Map
                            </Link>
                          </p>
                          <hr className="clearfix" />
                          <h5 className="mt-4 mb-4">More Info</h5>
                          <p className="mb-3">
                            Dal Makhani, Panneer Butter Masala, Kadhai Paneer,
                            Raita, Veg Thali, Laccha Paratha, Butter Naan
                          </p>
                          <div className="border-btn-main mb-4">
                            <Link
                              className="border-btn text-success mr-2"
                              to="#"
                            >
                              <Icofont icon="check-circled" /> Breakfast
                            </Link>
                            <Link
                              className="border-btn text-danger mr-2"
                              to="#"
                            >
                              <Icofont icon="close-circled" /> No Alcohol
                              Available
                            </Link>
                            <Link
                              className="border-btn text-success mr-2"
                              to="#"
                            >
                              <Icofont icon="check-circled" /> Vegetarian Only
                            </Link>
                            <Link
                              className="border-btn text-success mr-2"
                              to="#"
                            >
                              <Icofont icon="check-circled" /> Indoor Seating
                            </Link>
                            <Link
                              className="border-btn text-success mr-2"
                              to="#"
                            >
                              <Icofont icon="check-circled" /> Breakfast
                            </Link>
                            <Link
                              className="border-btn text-danger mr-2"
                              to="#"
                            >
                              <Icofont icon="close-circled" /> No Alcohol
                              Available
                            </Link>
                            <Link
                              className="border-btn text-success mr-2"
                              to="#"
                            >
                              <Icofont icon="check-circled" /> Vegetarian Only
                            </Link>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <div
                          id="book-a-table"
                          className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page"
                        >
                          <h5 className="mb-4">Book A Table</h5>
                          <Form>
                            <Row>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Full Name</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Full Name"
                                  />
                                </Form.Group>
                              </Col>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Email Address</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Email address"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Row>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Mobile number</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Mobile number"
                                  />
                                </Form.Group>
                              </Col>
                              <Col sm={6}>
                                <Form.Group>
                                  <Form.Label>Date And Time</Form.Label>
                                  <Form.Control
                                    type="text"
                                    placeholder="Enter Date And Time"
                                  />
                                </Form.Group>
                              </Col>
                            </Row>
                            <Form.Group className="text-right">
                              <Button variant="primary" type="button">
                                {" "}
                                Submit{" "}
                              </Button>
                            </Form.Group>
                          </Form>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="fifth">
                        <div
                          id="ratings-and-reviews"
                          className="bg-white rounded shadow-sm p-4 mb-4 clearfix restaurant-detailed-star-rating"
                        >
                          <div className="star-rating float-right">
                            <StarRating fontSize={26} star={5} />
                          </div>
                          <h5 className="mb-0 pt-1">Rate this Place</h5>
                        </div>
                        <div className="bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
                          <h5 className="mb-0 mb-4">Ratings and Reviews</h5>
                          <div className="graph-star-rating-header">
                            <div className="star-rating">
                              <StarRating
                                fontSize={18}
                                disabled={true}
                                star={5}
                              />
                              <b className="text-black ml-2">334</b>
                            </div>
                            <p className="text-black mb-4 mt-2">
                              Rated 3.5 out of 5
                            </p>
                          </div>
                          <div className="graph-star-rating-body">
                            <RatingBar leftText="5 Star" barValue={56} />
                            <RatingBar leftText="4 Star" barValue={23} />
                            <RatingBar leftText="3 Star" barValue={11} />
                            <RatingBar leftText="2 Star" barValue={6} />
                            <RatingBar leftText="1 Star" barValue={4} />
                          </div>
                          <div className="graph-star-rating-footer text-center mt-3 mb-3">
                            <Button
                              type="button"
                              variant="outline-primary"
                              size="sm"
                            >
                              Rate and Review
                            </Button>
                          </div>
                        </div>
                        <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
                          <Link
                            to="#"
                            className="btn btn-outline-primary btn-sm float-right"
                          >
                            Top Rated
                          </Link>
                          <h5 className="mb-1">All Ratings and Reviews</h5>
                          <Review
                            image="/img/user/1.png"
                            ImageAlt=""
                            ratingStars={5}
                            Name="Singh Osahan"
                            profileLink="#"
                            reviewDate="Tue, 20 Mar 2020"
                            reviewText="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classNameical literature, discovered the undoubtable source. Lorem Ipsum comes from sections"
                            likes="856M"
                            dislikes="158K"
                            otherUsers={this.state.users}
                          />
                          <hr />
                          <Review
                            image="/img/user/6.png"
                            ImageAlt=""
                            ratingStars={5}
                            Name="Gurdeep Osahan"
                            profileLink="#"
                            reviewDate="Tue, 20 Mar 2020"
                            reviewText="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                            likes="88K"
                            dislikes="1K"
                            otherUsers={this.state.users}
                          />
                          <hr />
                          <Link
                            className="text-center w-100 d-block mt-4 font-weight-bold"
                            to="#"
                          >
                            See All Reviews
                          </Link>
                        </div>
                        <div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
                          <h5 className="mb-4">Leave Comment</h5>
                          <p className="mb-2">Rate the Place</p>
                          <div className="mb-4">
                            <div className="star-rating">
                              <StarRating fontSize={26} star={5} />
                            </div>
                          </div>
                          <Form>
                            <Form.Group>
                              <Form.Label>Your Comment</Form.Label>
                              <Form.Control as="textarea" />
                            </Form.Group>
                            <Form.Group>
                              <Button variant="primary" size="sm" type="button">
                                {" "}
                                Submit Comment{" "}
                              </Button>
                            </Form.Group>
                          </Form>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </Col>
                <Col md={4}>
                  {/* <div className="bg-white rounded shadow-sm text-white mb-4 p-4 clearfix restaurant-detailed-earn-pts card-icon-overlap">
										<Image fluid className="float-left mr-3" src="/img/earn-score-icon.png" />
										<h6 className="pt-0 text-primary mb-1 font-weight-bold">OFFER</h6>
										<p className="mb-0">60% off on orders above $99 | Use coupon <span className="text-danger font-weight-bold">OSAHAN50</span></p>
										<div className="icon-overlap">
											<Icofont icon="sale-discount" />
										</div>
									</div> */}
                  <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
                    {this.props.cart.length > 0 ? (
                      <React.Fragment>
                        <h5 className="mb-1 text-white">Your Order</h5>
                        <p className="mb-4 text-white">
                          {this.props.cart.length} Items
                        </p>
                        <div className="bg-white rounded shadow-sm mb-2">
                          {this.props.cart.map((crt) => (
                            <CheckoutItem
                              key={crt.uid}
                              itemName={crt.name}
                              price={parseInt(crt.price)}
                              priceUnit="Rs."
                              id={crt.uid}
                              qty={crt.quantity}
                              show={true}
                              addons={crt.selectedaddons}
                            />
                          ))}
                        </div>
                      </React.Fragment>
                    ) : (
                      <Card className="mb-2 p-2">
                        <h5>Currently cart is empty.</h5>
                        <p>
                          Cart item is empty. You can select the food item and
                          choose addons.
                        </p>
                      </Card>
                    )}
                    {this.props.cart.length > 0 && (
                      <React.Fragment>
                        <div className="mb-2 bg-white rounded p-2 clearfix">
                          <Image
                            fluid
                            className="float-left"
                            src="/img/wallet-icon.png"
                          />
                          <h6 className="font-weight-bold text-right mb-2">
                            Subtotal :{" "}
                            <span className="text-danger">
                              Rs.{this.props.total}
                            </span>
                          </h6>
                          <p className="seven-color mb-1 text-right">
                            Extra charges may apply
                          </p>
                        </div>
                        <Link
                          to="/"
                          onClick={this.handleCheckout}
                          className="btn btn-success btn-block btn-lg"
                        >
                          Checkout
                          <Icofont icon="long-arrow-right" />
                        </Link>
                        <div className="pt-2"></div>
                        {/* <div className="alert alert-success" role="alert">
													You have saved <strong>$1,884</strong> on the bill
														  </div>
												<div className="pt-2"></div> */}
                      </React.Fragment>
                    )}
                    {/* <div className="text-center pt-2">
											<Image fluid src="https://dummyimage.com/352x504/ccc/ffffff.png&text=Google+ads" />
										</div>
										<div className="text-center pt-2">
											<Image fluid src="https://dummyimage.com/352x504/ccc/ffffff.png&text=Google+ads" />
										</div> */}
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </Tab.Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.products,
    total: state.cart.total,
  };
};

export default connect(mapStateToProps)(Detail);
