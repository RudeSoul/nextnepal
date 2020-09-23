import React from "react";
import { NavLink, Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Image,
} from "react-bootstrap";
import DropDownTitle from "../common/DropDownTitle";
import CartDropdownItem from "../cart/CartDropdownItem";
import Icofont from "react-icofont";
import { connect } from "react-redux";
import { getUserInfo } from "../../utils/axios/account";
import {
  getCookieCart,
  removeCookieaccountinfo,
  getCookieaccountinfo,
} from "../../utils/jscookies";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavExpanded: false,
      account: undefined,
      checkoutUrl: null,
    };
  }
  setIsNavExpanded = (isNavExpanded) => {
    this.setState({ isNavExpanded: isNavExpanded });
  };
  closeMenu = () => {
    this.setState({ isNavExpanded: false });
  };

  handleClick = (e) => {
    if (this.node.contains(e.target)) {
      // if clicked inside menu do something
    } else {
      // If clicked outside menu, close the navbar.
      this.setState({ isNavExpanded: false });
    }
  };

  handleUserInfo = async () => {
    let user = await getUserInfo();
    if (user) {
      this.setState({
        account: user,
      });
      this.props.setUserInfo(user);
    }
  };

  handleLogOut = () => {
    removeCookieaccountinfo();
    this.props.removeUserInfo();
    window.location.reload();
  };

  componentDidMount() {
    // document.addEventListener("click", this.handleClick, false);
    this.handleUserInfo();
    let cart = getCookieCart();
    if (cart) {
      this.props.populateCart(cart);
    }
  }

  UNSAFE_componentWillMount() {
    // document.removeEventListener("click", this.handleClick, false);
  }

  handleCheckout = (e) => {
    e.preventDefault();
    let userInfo = getCookieaccountinfo();
    if (userInfo) {
      window.location.href = "/checkout";
    } else {
      window.location.href = "/login";
    }
  };

  render() {
    return (
      <div ref={(node) => (this.node = node)}>
        <Navbar
          onToggle={this.setIsNavExpanded}
          expanded={this.state.isNavExpanded}
          color="light"
          expand="xl"
          className="navbar-light osahan-nav shadow-sm"
        >
          <Container>
            <Navbar.Brand to="/" as={NavLink}>
              {/* <Image src="img/logo.png" width="120px" /> */}
              <Image src={require("../../assets/img/logo.png")} width="80px" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav activeKey={0} className="ml-auto" onSelect={this.closeMenu}>
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  activeclassname="active"
                  exact
                  to="/"
                >
                  Home <span className="sr-only">(current)</span>
                </Nav.Link>
                <Nav.Link
                  eventKey={0}
                  as={NavLink}
                  exact
                  to="/food-and-beverage"
                >
                  Food &amp; Beverage
                </Nav.Link>
                <Nav.Link eventKey={0} as={NavLink} exact to="/services">
                  Services
                </Nav.Link>
                <Nav.Link eventKey={1} as={NavLink} to="/offers">
                  <Icofont icon="sale-discount" /> Offers{" "}
                  <Badge variant="danger">New</Badge>
                </Nav.Link>
                <Nav.Link eventKey={0} as={NavLink} exact to="/about-us">
                  About Us
                </Nav.Link>
                {!this.props.user && (
                  <React.Fragment>
                    <Nav.Link eventKey={0} as={NavLink} exact to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link eventKey={0} as={NavLink} exact to="/register">
                      Register
                    </Nav.Link>
                  </React.Fragment>
                )}
                <Nav.Link eventKey={0} as={NavLink} exact to="/food-sponsers">
                  Food Sponsors
                </Nav.Link>
                {this.props.user && (
                  <NavDropdown
                    alignRight
                    title={
                      <DropDownTitle
                        className="d-inline-block"
                        image={this.props.user.data.avatar || "img/user/4.png"}
                        imageAlt="user"
                        imageClass="nav-osahan-pic rounded-pill"
                        title={this.props.user.data.name}
                      />
                    }
                  >
                    <NavDropdown.Item
                      eventKey={4.1}
                      as={NavLink}
                      activeclassname="active"
                      to="/myaccount/orders"
                    >
                      <Icofont icon="food-cart" /> Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      eventKey={4.2}
                      as={NavLink}
                      activeclassname="active"
                      to="/myaccount/wallet"
                    >
                      <Icofont icon="sale-discount" /> Wallet
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item eventKey={4.3} as={NavLink} activeclassname="active" to="/myaccount/favourites"><Icofont icon='heart' /> Favourites</NavDropdown.Item>
										<NavDropdown.Item eventKey={4.4} as={NavLink} activeclassname="active" to="/myaccount/payments"><Icofont icon='credit-card' /> Payments</NavDropdown.Item> */}
                    <NavDropdown.Item
                      eventKey={4.5}
                      as={NavLink}
                      activeclassname="active"
                      to="/myaccount/addresses"
                    >
                      <Icofont icon="location-pin" /> Addresses
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      eventKey={4.6}
                      activeclassname="active"
                      onClick={this.handleLogOut}
                    >
                      <Icofont icon="icofont-logout" /> Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
                <NavDropdown
                  activeclassname="active"
                  alignRight
                  className="dropdown-cart"
                  title={
                    <DropDownTitle
                      className="d-inline-block"
                      faIcon="shopping-basket"
                      iconClass="mr-1"
                      title="Cart"
                      badgeClass="ml-1"
                      badgeVariant="success"
                      badgeValue={this.props.cart.length || 0}
                    />
                  }
                >
                  {this.props.cart.length > 0 ? (
                    <div className="dropdown-cart-top shadow-sm">
                      <div className="dropdown-cart-top-body border-top p-4">
                        {this.props.cart.map((crt) => (
                          <CartDropdownItem
                            key={crt.uid}
                            iconClass="text-success food-item"
                            title={crt.name}
                            price={crt.price}
                            qty={parseInt(crt.quantity)}
                            addons={crt.selectedaddons}
                          />
                        ))}
                      </div>
                      <div className="dropdown-cart-top-footer border-top p-4">
                        <p className="mb-0 font-weight-bold text-secondary">
                          Sub Total{" "}
                          <span className="float-right text-dark">
                            Rs.{this.props.total}
                          </span>
                        </p>
                        <small className="text-info">
                          Extra charges may apply
                        </small>
                      </div>
                      <div className="dropdown-cart-top-footer border-top p-2">
                        <NavDropdown.Item
                          eventKey={5.1}
                          as={Link}
                          className="btn btn-success btn-block py-3 text-white text-center dropdown-item"
                          // to="/checkout"
                          to="/"
                          onClick={this.handleCheckout}
                        >
                          {" "}
                          Checkout
                        </NavDropdown.Item>
                      </div>
                    </div>
                  ) : (
                    <div className="dropdown-cart-top shadow-sm">
                      <h6 style={{ marginBottom: 0 }} className="p-4">
                        No item available in cart.
                      </h6>
                    </div>
                  )}
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.products,
    total: state.cart.total,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (user) => dispatch({ type: "USER_INFO", user }),
    removeUserInfo: () => dispatch({ type: "REMOVE_USER_INFO" }),
    populateCart: (cart) => dispatch({ type: "CART_POPULATE", cart }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
