import React from 'react';
import PropTypes from 'prop-types';
import { Image, Media, Button, Badge, Spinner } from 'react-bootstrap';
import Icofont from 'react-icofont';
import { instance } from '../../utils/axios/instance';
import { getCookieaccountinfo } from '../../utils/jscookies';
import { connect } from 'react-redux';

class OrderCard extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			load: false
		}
	}

	handleCancelOrder = () => {
		let userInfo = getCookieaccountinfo();
		this.setState({
			load: true
		});
		instance.post('cancel-order', {
			user_id: this.props.user_id,
			order_id: this.props.id,
			token: userInfo.data.auth_token
		}).then(data => {
			console.log(data);
			if (data.data.success) {
				instance.post('get-orders', {
					user_id: this.props.user_id,
					token: userInfo.data.auth_token
				}).then(data => {
					this.props.setOrders(data.data);
					this.setState({
						load: false
					});
				}).catch(err => {
					console.log(err);
				});
			}
		}).catch(err => {
			this.setState({
				load: false
			});
			alert('Unable to cancel order. Please contact customer care.')
		});
	}

	render() {
		return (
			<div className="bg-white card mb-4 order-list shadow-sm">
				<div className="gold-members p-4">
					<Media>
						<Image className="mr-4" src={this.props.image} alt={this.props.imageAlt} />
						<Media.Body>
							{this.props.deliveredDate ?
								(
									<span className="float-right text-info">Delivered on {this.props.deliveredDate}
										<Icofont icon="check-circled" className="text-success ml-1" />
									</span>
								)
								: ""
							}
							<h6 className="mb-2">
								{this.props.orderTitle}
							</h6>
							<p className="text-gray mb-1">
								<Icofont icon="location-arrow" /> {this.props.address}
							</p>
							<p className="text-gray mb-3">
								<Icofont icon="list" /> ORDER #{this.props.orderNumber}
							</p>

							{
								this.props.orderProducts.map((prod, index) => (
									<p className="text-dark" key={index}>
										{prod.name} X {prod.quantity}
									</p>
								))
							}
							<hr />
							{
								this.props.orderStatus === 1 &&
								<div className="float-right">
									<Button className="btn btn-primary" onClick={() => this.handleCancelOrder()}>
										Cancel Order &nbsp;
										{this.state.load && <Spinner animation="border" role="status" size="sm"></Spinner>}
									</Button>
								</div>
							}
							{
								this.props.orderStatus === 4 &&
								<div className="float-right">
									<Badge variant="primary">Product Assigned to Delivery Guy.</Badge>
								</div>
							}
							{
								this.props.orderStatus === 6 &&
								<div className="float-right">
									<Badge style={{ background: "red", color: '#fff' }}>Order Canceled</Badge>
								</div>
							}
							{
								this.props.orderStatus === 2 &&
								<div className="float-right">
									<Badge variant="warning">Preparing</Badge>
								</div>
							}
							<p className="mb-0 text-black text-primary pt-2">
								<span className="text-black font-weight-bold"> Total Amount:</span> {this.props.orderTotal}
							</p>
						</Media.Body>
					</Media>
				</div>
			</div>
		);
	}
}

OrderCard.propTypes = {
	image: PropTypes.string.isRequired,
	imageAlt: PropTypes.string,
	orderNumber: PropTypes.string.isRequired,
	orderTitle: PropTypes.string.isRequired,
	address: PropTypes.string.isRequired,
	orderProducts: PropTypes.array.isRequired,
	orderTotal: PropTypes.string.isRequired,
	orderStatus: PropTypes.number.isRequired
};

const mapDispatchToProps = (dispatch) => {
	return {
		setOrders: (order) => dispatch({ type: 'ORDER_INFO', order })
	}
}

export default connect(null, mapDispatchToProps)(OrderCard);