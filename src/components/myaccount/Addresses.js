import React from 'react';
import { Row, Col, Spinner, Button } from 'react-bootstrap';
import AddAddressModal from '../modals/AddAddressModal';
import DeleteAddressModal from '../modals/DeleteAddressModal';
import AddressCard from '../common/AddressCard';
import { instance } from '../../utils/axios/instance';
import { getCookieaccountinfo } from '../../utils/jscookies';
import { connect } from 'react-redux';
import Icofont from 'react-icofont';

class Addresses extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			showDeleteModal: false,
			showAddressModal: false,
			deleteId: null
		};
	}

	handleUserAddress = () => {
		this.props.setAddress(null);
		let userInfo = getCookieaccountinfo();
		instance.post('get-addresses', {
			token: userInfo.data.auth_token,
			user_id: userInfo.data.id
		}).then(data => {
			this.props.setAddress(data.data);
		}).catch(err => {
			alert(err);
		});
	}

	componentDidMount() {
		this.handleUserAddress();
	}

	hideDeleteModal = () => this.setState({ showDeleteModal: false });
	hideAddressModal = () => {
		this.setState({ showAddressModal: false, deleteId: null });
	};

	handleAddAddress = () => {
		this.setState({ showAddressModal: true});
	}

	render() {

		if (!this.props.addresses) return (
			<div className="account-spinner">
				<Spinner animation="grow" variant="primary" />
			</div>
		);

		return (
			<>
				{this.state.showAddressModal && <AddAddressModal show={this.state.showAddressModal} onHide={this.hideAddressModal} />}
				<DeleteAddressModal show={this.state.showDeleteModal} onHide={this.hideDeleteModal} id={this.state.deleteId} />
				<div className='p-4 bg-white shadow-sm'>
					<Row>
						<Col md={12}>
							<h4 className="font-weight-bold mt-0 mb-3">Manage Addresses</h4>
						</Col>
						{
							 this.props.addresses && this.props.addresses.map((address, index) => (
								<Col md={6} key={index}>
									<AddressCard
										boxClass="border shadow"
										title={address.house}
										icoIcon='icofont-google-map'
										iconclassName='icofont-3x'
										address={address.address}
										onDeleteClick={() => this.setState({ showDeleteModal: true, deleteId: address.id })}
									/>
								</Col>
							))
						}
						<Col md={12}>
							{
								(this.props.addresses && this.props.addresses.length === 0) && <p>Currently there are no address to display. Please add addresses.</p>
							}
						</Col>
						<Col>
							<Button type="button" onClick={this.handleAddAddress}>
								<Icofont icon="plus" />
							</Button>
						</Col>
					</Row>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		addresses: state.addresses
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setAddress: (addresses) => dispatch({ type: 'ADDRESSES', addresses })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Addresses);