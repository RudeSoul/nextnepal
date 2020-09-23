import React from 'react';
import { Form, InputGroup, Modal, Button, Spinner } from 'react-bootstrap';
import Icofont from 'react-icofont';
import { getCordinateToAddress, placeInitialization } from '../../utils/axios/location';
import { connect } from 'react-redux';
import { instance } from '../../utils/axios/instance';
import { getCookieaccountinfo, getCookieCart } from '../../utils/jscookies';

class AddAddressModal extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			latitude: null,
			longitude: null,
			house: null,
			get_only_default_address: "get_only_default_address",
			address: null,
			error: null,
			locateMeLoad: false,
			newAddress: null,
			loadAdd: false,
		};

		this.autoComplete = React.createRef();
	}

	handleLocateMe = async () => {
		this.setState({ locateMeLoad: true });
		const newAddress = await getCordinateToAddress();
		this.setState({ locateMeLoad: false });
		let type = typeof newAddress;
		if (type === "object") {
			this.setState({
				latitude: newAddress.latitude,
				longitude: newAddress.longitude,
				address: newAddress.address
			});
		} else {
			alert('You must allow geo location to find your address!');
		}
	}

	handleSearchKeyPress = (e) => {
		this.setState({
			error: null,
			latitude: null,
			longitude: null,
			address: e.target.value,
		});
	};

	getPlacesList = () => {
		let options = {
			componentRestrictions: { country: 'NP' },
		};
		let input = document.getElementById('addLocationaddress');
		this.autoComplete.current = new window.google.maps.places.Autocomplete(
			input,
			options,
		);
		this.autoComplete.current.addListener('place_changed', () => this.setLocation());
	}

	setLocation = () => {
		let place = this.autoComplete.current.getPlace();
		if (place) {
			this.setState({
				latitude: place.geometry.location.lat(),
				longitude: place.geometry.location.lng(),
				address: `${place.name}, ${place.formatted_address}`,
			});
		}
	};

	componentDidMount() {
		placeInitialization.then(() => {
			this.getPlacesList();
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		if (!this.state.latitude || !this.state.longitude) {
			this.setState({
				error: 'Address is invalid. Please choose a valid address'
			});
			return;
		}
		let userInfo = getCookieaccountinfo();
		let cart = getCookieCart();
		this.setState({
			loadAdd: true
		});
		instance.post('save-address', {
			address: this.state.address,
			get_only_default_address: this.state.get_only_default_address,
			house: this.state.house,
			latitude: this.state.latitude,
			longitude: this.state.longitude,
			token: userInfo.data.auth_token,
			user_id: userInfo.data.id
		}).then(data => {
			if (cart) {
				instance.post('get-addresses', {
					token: userInfo.data.auth_token,
					user_id: userInfo.data.id,
					restaurant_id: cart.products[0].restaurant_id,
				}).then(data => {
					this.props.addAddress(data.data);
				}).catch(err => {
					alert(err);
				});
			}
			this.setState({
				loadAdd: false
			});
			this.props.onHide();
		}).catch(err => console.log(err))
	}

	render() {
		return (
			<Modal
				show={this.props.show}
				onHide={this.props.onHide}
				centered
			>
				<Modal.Header closeButton={true}>
					<Modal.Title as='h5' id="add-address">Add Delivery Address</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					{this.state.error && <span className="text-danger">{this.state.error}</span>}
					<Form id="addAddressForm" onSubmit={(e) => this.onSubmit(e)}>
						<div className="form-row">
							<Form.Group className="col-md-12">
								<Form.Label>Delivery Area</Form.Label>
								<InputGroup>
									<Form.Control ref={this.autoComplete} id="addLocationaddress" value={this.state.address ? this.state.address : ''} type="text" placeholder="Delivery Area" onChange={(e) => this.handleSearchKeyPress(e)} required />
									<InputGroup.Append>
										<Button variant="outline-secondary" type="button" id="button-addon2" onClick={this.handleLocateMe}>
											{
												this.state.locateMeLoad ?
													<Spinner animation="border" role="status" size="sm">
														<span className="sr-only">Loading...</span>
													</Spinner> :
													<Icofont icon="ui-pointer" />
											}
										</Button>
									</InputGroup.Append>
								</InputGroup>
							</Form.Group>
							<Form.Group className="col-md-12">
								<Form.Label>Address Tag</Form.Label>
								<Form.Control type="text" onChange={(e) => this.setState({ house: e.target.value })} placeholder="e.g. Work or Home or Hostel" required />
							</Form.Group>
						</div>
						<div className="d-flex">
							<Button type='button' onClick={this.props.onHide} variant="outline-primary" className="text-center justify-content-center mr-3">CANCEL</Button>
							<Button type='submit' variant="primary" className='text-center justify-content-center' >
								SUBMIT
								{
									this.state.loadAdd ?
										<Spinner animation="border" role="status" size="sm">
										</Spinner> :
										""
								}
							</Button>
						</div>
					</Form>
				</Modal.Body>


			</Modal>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addAddress: (addresses) => dispatch({ type: 'ADDRESSES', addresses })
	}
}

export default connect(null, mapDispatchToProps)(AddAddressModal);