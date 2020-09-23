import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, InputGroup, Button, Tab, Nav, Image, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import ChooseAddressCard from '../components/common/ChooseAddressCard';
import CheckoutItem from '../components/common/CheckoutItem';
import AddAddressModal from '../components/modals/AddAddressModal';
import Icofont from 'react-icofont';
import { instance } from '../utils/axios/instance';
import { connect } from 'react-redux';
import { getCookieaccountinfo, getCookieCart, getCookieLocationInfo, removeCookieCart } from '../utils/jscookies';

class Checkout extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			showAddressModal: false,
			addresses: null,
			gateway: null,
			currentAddress: null,
			deliverAddress: null,
			res: null,
			cart: null,
			promo: null,
			promoCode: null,
			promoerr: null,
			promoload: false,
			discount: 0,
			addressErr: null,
			paymentLoad: false
		};

		this.onDeliverHere = this.onDeliverHere.bind(this);
	}

	hideAddressModal = () => this.setState({ showAddressModal: false });

	handleUserAddress = () => {
		let userInfo = getCookieaccountinfo();
		let address = getCookieLocationInfo();
		let cart = getCookieCart();
		instance.post('get-addresses', {
			token: userInfo.data.auth_token,
			user_id: userInfo.data.id,
			restaurant_id: cart.products[0].restaurant_id
		}).then(data => {
			this.props.addAddress(data.data);
		}).catch(err => {
			alert(err);
		});

		instance.post('get-payment-gateways', {
			token: userInfo.data.auth_token
		}).then(data => {
			this.setState({
				gateway: data.data
			})
		}).catch(err => {
			console.log(err);
		});

		if (address) {
			this.setState({
				currentAddress: address
			});
		}
	}

	handleResInfo = () => {
		let cart = getCookieCart();
		instance.post(`get-restaurant-info-by-id/${cart.products[0].restaurant_id}`).then(data => { this.setState({ res: data.data }) }).catch(err => { alert(err) })
	}

	componentDidMount() {
		this.handleUserAddress();
		this.handleResInfo();
	}

	handlePromo = () => {
		if (!this.state.promoCode || this.state.promoCode === '') {
			this.setState({
				promoerr: "enter coupon code"
			});
			return;
		}
		this.setState({
			promoload: true
		});
		instance.post('apply-coupon', {
			restaurant_id: this.state.res.id,
			subtotal: parseInt(this.props.total),
			coupon: this.state.promoCode.toLowerCase()
		}).then(data => {
			if (data.data.success) {
				this.setState({
					promo: data.data,
					promoload: false,
					promoerr: "",
				});
				if (data.data.discount_type === "PERCENTAGE") {
					this.setState({
						discount: this.props.total * data.data.discount / 100
					});
				} else {
					this.setState({
						discount: data.data.discount
					});
				}
			} else {
				this.setState({
					promoerr: "invalid coupon",
					promo: null,
					promoload: false,
					discount: 0,
				});
			}
		}).catch(err => {
			this.setState({
				promoerr: "server error",
				promoload: false
			})
		})
	}

	handlePromoCodeValue(e) {
		this.setState({
			promoCode: e.target.value.toUpperCase()
		});
	}

	onDeliverHere(add) {
		this.setState({
			addressErr: null,
			deliverAddress: add
		});
	}

	handleCOD(e) {
		e.preventDefault();
		this.setState({
			paymentLoad: true
		});
		let userInfo = getCookieaccountinfo();
		if (!this.state.deliverAddress) {
			this.setState({
				addressErr: "Select Delivery Address",
				paymentLoad: false
			});
			return;
		}

		instance.post('place-order', {
			coupon: this.state.promo,
			delivery_type: 1,
			dis: 4.7,
			location: this.state.deliverAddress,
			method: "COD",
			order: this.props.cart,
			order_comment: null,
			partial_wallet: false,
			payment_token: "",
			token: userInfo.data.auth_token,
			total: { productQuantity: this.props.cart.length, totalPrice: this.props.total },
			user: userInfo
		}).then(data => {
			removeCookieCart();
			this.setState({
				paymentLoad: false
			});
			window.location.href = "/myaccount/orders"
		}).catch(err => {
			console.log(err);
			this.setState({
				paymentLoad: false
			});
		});
	}

	render() {
		return (
			<section className="offer-dedicated-body mt-4 mb-4 pt-2 pb-2">
				{this.state.showAddressModal && <AddAddressModal show={this.state.showAddressModal} onHide={this.hideAddressModal} />}
				<Container>
					<Row>
						<Col md={8}>
							<div className="offer-dedicated-body-left">
								{/* <div className="bg-white rounded shadow-sm p-4 mb-4">
	                        <h6 className="mb-3">You may also like</h6>
	                        <ItemsCarousel />
	                     </div> */}
								<div className="pt-2"></div>
								<div className="bg-white rounded shadow-sm p-4 mb-4">
									<h4 className="mb-1">Choose a delivery address</h4>
									<h6 className="mb-3 text-black-50">Multiple addresses in this location</h6>
									<Row>
										{
											this.props.addresses && this.props.addresses.map(add => (
												<Col md={6} key={add.id}>
													<ChooseAddressCard
														id={add.id}
														add={add}
														boxclassName="border border-success"
														title={add.house}
														icoIcon='briefcase'
														iconclassName='icofont-3x'
														address={add.address}
														is_operational={add.is_operational}
														onDeliverHere={this.onDeliverHere}
														current={this.state.deliverAddress}
													/>
												</Col>
											))
										}
										<Col md={6}>
											<Button onClick={() => this.setState({ showAddressModal: true })}>Add New Address</Button>
										</Col>
									</Row>
									{this.state.addressErr && <h4 className="text-error">Error: {this.state.addressErr}</h4>}
								</div>
								<div className="pt-2"></div>
								<div className="bg-white rounded shadow-sm p-4 osahan-payment">
									<h4 className="mb-1">Choose payment method</h4>
									<h6 className="mb-3 text-black-50">Credit/Debit Cards</h6>
									<Tab.Container id="left-tabs-example" defaultActiveKey="first">
										<Row>
											<Col sm={4} className="pr-0">
												<Nav variant="pills" className="flex-column">
													<Nav.Link eventKey="first"><Icofont icon="credit-card" /> Credit/Debit Cards</Nav.Link>
													<Nav.Link eventKey="third"><Icofont icon="card" /> Wallet</Nav.Link>
													<Nav.Link eventKey="fourth"><Icofont icon="bank-alt" /> Netbanking</Nav.Link>
													<Nav.Link eventKey="fifth"><Icofont icon="money" /> Cash on Delivery</Nav.Link>
												</Nav>
											</Col>
											<Col sm={8} className="pl-0">
												<Tab.Content className='h-100'>
													<Tab.Pane eventKey="first">
														<h6 className="mb-3 mt-0 mb-3">Add new card</h6>
														<p>WE ACCEPT <span className="osahan-card">
															<Icofont icon="visa-alt" /> <Icofont icon="mastercard-alt" /> <Icofont icon="american-express-alt" /> <Icofont icon="payoneer-alt" /> <Icofont icon="apple-pay-alt" /> <Icofont icon="bank-transfer-alt" /> <Icofont icon="discover-alt" /> <Icofont icon="jcb-alt" />
														</span>
														</p>
														<Form>
															<div className="form-row">
																<Form.Group className="col-md-12">
																	<Form.Label>Card number</Form.Label>
																	<InputGroup>
																		<Form.Control type="number" placeholder="Card number" />
																		<InputGroup.Append>
																			<Button variant="outline-secondary" type="button" id="button-addon2"><Icofont icon="card" /></Button>
																		</InputGroup.Append>
																	</InputGroup>
																</Form.Group>
																<Form.Group className="col-md-8">
																	<Form.Label>Valid through(MM/YY)
	                                             </Form.Label>
																	<Form.Control type="number" placeholder="Enter Valid through(MM/YY)" />
																</Form.Group>
																<Form.Group className="col-md-4">
																	<Form.Label>CVV
	                                             </Form.Label>
																	<Form.Control type="number" placeholder="Enter CVV Number" />
																</Form.Group>
																<Form.Group className="col-md-12">
																	<Form.Label>Name on card
	                                             </Form.Label>
																	<Form.Control type="text" placeholder="Enter Card number" />
																</Form.Group>
																<Form.Group className="col-md-12">
																	<Form.Check
																		custom
																		type="checkbox"
																		id="custom-checkbox1"
																		label="Securely save this card for a faster checkout next time."
																	/>
																</Form.Group>
																<Form.Group className="col-md-12 mb-0">
																	<Link to="/thanks" className="btn btn-success btn-block btn-lg">PAY Rs.1329
	                                             	<Icofont icon="long-arrow-right" />
																	</Link>
																</Form.Group>
															</div>
														</Form>
													</Tab.Pane>
													<Tab.Pane eventKey="third">
														<div className="border shadow-sm-sm p-4 d-flex align-items-center bg-white mb-3">
															<Image src='img/bank/esewa.png' width='40px' className='mr-3' />
															<div className="d-flex flex-column">
																<h5 className="card-title">Esewa</h5>
																<p className="card-text">Esewa lets you order now & pay later at no extra cost.</p>
																<Link to="#" className="card-link font-weight-bold">LINK ACCOUNT <Icofont icon="link-alt" /></Link>
															</div>
														</div>
														<div className="border shadow-sm-sm p-4 d-flex bg-white align-items-center mb-3">
															<Image src='img/bank/khalti.png' width='40px' className='mr-3' />
															<div className="d-flex flex-column">
																<h5 className="card-title">Paypal</h5>
																<p className="card-text">Paypal lets you order now & pay later at no extra cost.</p>
																<Link to="#" className="card-link font-weight-bold">LINK ACCOUNT <Icofont icon="link-alt" /></Link>
															</div>
														</div>
														<div className="border shadow-sm-sm p-4 d-flex bg-white align-items-center mb-3">
															<Icofont icon="paypal" className="mr-3 icofont-3x" />
															<div className="d-flex flex-column">
																<h5 className="card-title">Paypal</h5>
																<p className="card-text">Paypal lets you order now & pay later at no extra cost.</p>
																<Link to="#" className="card-link font-weight-bold">LINK ACCOUNT <Icofont icon="link-alt" /></Link>
															</div>
														</div>
														<div className="border shadow-sm-sm p-4 d-flex bg-white align-items-center">
															<Image src='img/bank/fonepay.png' width='40px' className='mr-3' />
															<div className="d-flex flex-column">
																<h5 className="card-title">Fonepay</h5>
																<p className="card-text">Fonepay lets you order now & pay later at no extra cost.</p>
																<Link to="#" className="card-link font-weight-bold">LINK ACCOUNT <Icofont icon="link-alt" /></Link>
															</div>
														</div>
													</Tab.Pane>
													<Tab.Pane eventKey="fourth">
														<h6 className="mb-3 mt-0 mb-3">Netbanking</h6>
														<Form>
															<div className="form-row">
																<Form.Group className="col-md-12">
																	<Form.Label>Select Bank
	                                             </Form.Label>
																	<br />
																	<Form.Control as="select" className="custom-select">
																		<option>Sanima Bank</option>
																		<option>NIBL</option>
																		<option>NIC Asia</option>
																		<option>Prabhu Bank</option>
																	</Form.Control>
																</Form.Group>
																<Form.Group className="col-md-12 mb-0">
																	<Link to="/thanks" className="btn btn-success btn-block btn-lg">PAY Rs.1329
	                                             <Icofont icon="long-arrow-right" /></Link>
																</Form.Group>
															</div>
														</Form>
													</Tab.Pane>
													<Tab.Pane eventKey="fifth">
														<h6 className="mb-3 mt-0 mb-3">Cash</h6>
														<p>Please keep exact change handy to help us serve you better</p>
														<hr />
														<Form>
															<Link to="/thanks" className="btn btn-success btn-block btn-lg">PAY Rs.1329
	                                       <Icofont icon="long-arrow-right" /></Link>
														</Form>
													</Tab.Pane>
												</Tab.Content>
											</Col>
										</Row>
									</Tab.Container>
								</div>
							</div>
						</Col>
						<Col md={4}>
							<div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
								{
									this.state.res &&
									<div className="d-flex mb-4 osahan-cart-item-profile">
										<Image fluid className="mr-3 rounded-pill" alt="osahan" src={`${process.env.REACT_APP_IMAGE_URL}/${this.state.res.image}`} />
										<div className="d-flex flex-column">
											<h6 className="mb-1 text-white">{this.state.res.name}</h6>
											<p className="mb-0 text-white"><Icofont icon="location-pin" /> {this.state.res.address}</p>
										</div>
									</div>
								}
								<div className="bg-white rounded shadow-sm mb-2">
									{
										this.props.cart && this.props.cart.map(crt => (
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
										))
									}
								</div>
								<div className="mb-2 bg-white rounded p-2 clearfix">
									<InputGroup className="input-group-sm mb-2">
										<Form.Control type="text" value={this.state.promoCode ? this.state.promoCode : ''} onChange={(e) => this.handlePromoCodeValue(e)} placeholder="Enter promo code" />
										<InputGroup.Append>
											<Button variant="primary" type="button" id="button-addon2" onClick={this.handlePromo}><Icofont icon="sale-discount" />
												{
													this.state.promoload &&
													<Spinner animation="border" role="status" size="sm">
														<span className="sr-only">Loading...</span>
													</Spinner>
												}
												APPLY
											</Button>
										</InputGroup.Append>
									</InputGroup>
									<div className="text-error">{this.state.promoerr}</div>
									{/* <InputGroup className="mb-0">
										<InputGroup.Prepend>
											<InputGroup.Text><Icofont icon="comment" /></InputGroup.Text>
										</InputGroup.Prepend>
										<Form.Control as="textarea" placeholder="Any suggestions? We will pass it on..." aria-label="With textarea" />
									</InputGroup> */}
								</div>
								<div className="mb-2 bg-white rounded p-2 clearfix">
									<p className="mb-1">Item Total <span className="float-right text-dark">Rs.{this.props.total}</span></p>
									{
										this.state.promo &&
										<p className="mb-1">Discount <span className="float-right text-dark">- Rs.{this.state.discount}</span></p>
									}
									{/* <p className="mb-1">Restaurant Charges <span className="float-right text-dark">Rs.62.8</span></p> */}
									{/* <p className="mb-1">Delivery Fee
                    		<OverlayTrigger
											key="top"
											placement="top"
											overlay={
												<Tooltip id="tooltip-top">
													Total discount breakup
						        </Tooltip>
											}
										>
											<span className="text-info ml-1">
												<Icofont icon="info-circle" />
											</span>
										</OverlayTrigger>
										<span className="float-right text-dark">Rs.10</span>

									</p>
									<p className="mb-1 text-success">Total Discount
                           <span className="float-right text-success">Rs.1884</span>
									</p> */}
									<hr />
									<h6 className="font-weight-bold mb-0">TO PAY  <span className="float-right">Rs.{this.props.total - this.state.discount}</span></h6>
								</div>
								<Link to="/thanks" onClick={e => this.handleCOD(e)} className="btn btn-success btn-block btn-lg">COD
                 	<Icofont icon="long-arrow-right" />
									{
										this.state.paymentLoad &&
										<Spinner animation="border" role="status" size="sm">
											<span className="sr-only">Loading...</span>
										</Spinner>
									}
								</Link>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		cart: state.cart.products,
		total: state.cart.total,
		addresses: state.addresses
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addAddress: (addresses) => dispatch({ type: 'ADDRESSES', addresses }),
		order: (cart) => dispatch({ type: 'ORDER_INFO', cart })
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Checkout);