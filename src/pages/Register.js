import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { registerAccounts } from '../utils/axios/account';
import { setCookieaccountinfo } from '../utils/jscookies';

class Register extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			name: null,
			email: null,
			phone: null,
			password: null,
			confirmPassword: null,
			error: null,
			load: false
		};
	}

	handleInputChange(e, index) {
		this.setState({
			[index]: e.target.value,
			error: null
		});
	}

	async handleSignUp () {
		let signUpDetail = await registerAccounts(this.state.email, this.state.password, this.state.phone, this.state.name);
		if (signUpDetail.email_phone_already_used) {
			this.setState({
				error: 'Email or Phone Number already exists.'
			});
			return;
		}
		this.props.setUserInfo(signUpDetail);
		setCookieaccountinfo(signUpDetail);
		this.setState({
			name: null,
			email: null,
			phone: null,
			password: null,
			confirmPassword: null,
			error: null,
			load: false
		})
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({
			load: true
		})
		if (this.state.password !== this.state.confirmPassword) {
			this.setState({
				error: 'Passwords does not match!',
				load: false
			});
			return;
		}
		this.handleSignUp();
	}

	render() {
		return (
			<Container fluid className='bg-white'>
				<Row>
					<Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
					<Col md={8} lg={6}>
						<div className="login d-flex align-items-center py-5">
							<Container>
								<Row>
									<Col md={9} lg={8} className="mx-auto pl-5 pr-5">
										<h3 className="login-heading mb-4">Create New User Account!</h3>
										{this.state.error && <p className="text-error">{this.state.error}</p>}
										<Form onSubmit={(e) => this.onSubmit(e)}>
											<div className="form-label-group">
												<Form.Control onChange={(e) => this.handleInputChange(e, 'name')} type="text" id="inputName" placeholder="Name" required />
												<Form.Label htmlFor="inputName">Name</Form.Label>
											</div>
											<div className="form-label-group">
												<Form.Control onChange={(e) => this.handleInputChange(e, 'email')} type="email" id="inputEmail" placeholder="Email address" required />
												<Form.Label htmlFor="inputEmail">Email address</Form.Label>
											</div>
											<div className="form-label-group">
												<Form.Control onChange={(e) => this.handleInputChange(e, 'phone')} type="text" id="inputPhone" placeholder="Phone Number" pattern="([+]\d[977])\d[0-9]{10}" title="Must have +977 at start and must contain 10 digits number." required />
												<Form.Label htmlFor="inputPhone">Phone Number</Form.Label>
											</div>
											<div className="form-label-group">
												<Form.Control onChange={(e) => this.handleInputChange(e, 'password')} type="password" id="inputPassword" placeholder="Password" pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$" title="Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character." required />
												<Form.Label htmlFor="inputPassword">Password</Form.Label>
											</div>
											<div className="form-label-group">
												<Form.Control onChange={(e) => this.handleInputChange(e, 'confirmPassword')} type="password" id="inputCPassword" placeholder="Comfirm Password" required />
												<Form.Label htmlFor="inputCPassword">Comfirm Password</Form.Label>
											</div>
											<Button type="submit" className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2">Sign Up</Button>
											<div className="text-center pt-3">
												Already have an account? <Link className="font-weight-bold" to="/login">Sign In</Link>
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

const mapDispatchToProps = (dispatch) => {
	return {
		setUserInfo: (user) => dispatch({type: 'USER_INFO', user})
	}
}


export default connect(null, mapDispatchToProps)(Register);