import React from "react";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Container, Form, Button, Spinner } from "react-bootstrap";
import FontAwesome from "../components/common/FontAwesome";
import { loginAccounts } from "../utils/axios/account";
import { setCookieaccountinfo } from "../utils/jscookies";
import { connect } from "react-redux";

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      remember: false,
      loginLoad: false,
      info: null,
    };
  }

  handleSignIn = async (e) => {
    e.preventDefault();
    this.setState({
      loginLoad: true,
    });
    let info = await loginAccounts(this.state.email, this.state.password);
    if (info) {
      this.setState({
        loginLoad: false,
        info: info,
      });
      setCookieaccountinfo(info);
      if (info.success) {
        info.data.auth_token = null;
        this.props.setUserInfo(info);
      }
    }
  };

  handleEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRem(e) {
    this.setState({
      remember: e.target.checked,
    });
  }

  render() {
    if (this.props.user && this.props.user.success)
      return <Redirect to="/myaccount/orders" />;

    return (
      <Container fluid className="bg-white">
        <Row>
          <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
          <Col md={8} lg={6}>
            <div className="login d-flex align-items-center py-5">
              <Container>
                <Row>
                  <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                    <h3 className="login-heading mb-4">Welcome back!</h3>
                    {this.state.info && !this.state.info.success && (
                      <p className="text-error">
                        Email address or password does not match!
                      </p>
                    )}
                    <Form onSubmit={(e) => this.handleSignIn(e)}>
                      <div className="form-label-group">
                        <Form.Control
                          onChange={(e) => this.handleEmail(e)}
                          type="email"
                          id="inputEmail"
                          placeholder="Email address"
                          required
                        />
                        <Form.Label htmlFor="inputEmail">
                          Email Address
                        </Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          onChange={(e) => this.handlePassword(e)}
                          type="password"
                          id="inputPassword"
                          placeholder="Password"
                          required
                        />
                        <Form.Label htmlFor="inputPassword">
                          Password
                        </Form.Label>
                      </div>
                      <Form.Check
                        onChange={(e) => this.handleRem(e)}
                        className="mb-3"
                        custom
                        type="checkbox"
                        id="custom-checkbox"
                        label="Remember password"
                      />
                      <Button
                        type="submit"
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      >
                        Sign in{" "}
                        {this.state.loginLoad ? (
                          <Spinner
                            animation="border"
                            variant="primary"
                            size="sm"
                          />
                        ) : (
                          ""
                        )}
                      </Button>
                      <div className="text-center pt-3">
                        Don’t have an account?{" "}
                        <Link className="font-weight-bold" to="/register">
                          Sign Up
                        </Link>
                      </div>
                      <hr className="my-4" />
                      <p className="text-center">LOGIN WITH</p>
                      <div className="row">
                        <div className="col pr-2">
                          <Button
                            className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                            type="button"
                          >
                            <FontAwesome icon="google" className="mr-2" />{" "}
                            Google
                          </Button>
                        </div>
                        <div className="col pl-2">
                          <Button
                            className="btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase"
                            type="button"
                          >
                            <FontAwesome icon="facebook" className="mr-2" />{" "}
                            Facebook
                          </Button>
                        </div>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (user) => dispatch({ type: "USER_INFO", user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
