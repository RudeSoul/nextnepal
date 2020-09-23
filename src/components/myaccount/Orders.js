import React from 'react';
import OrderCard from '../common/OrderCard';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { instance } from '../../utils/axios/instance';
import { getCookieaccountinfo } from '../../utils/jscookies';

class Orders extends React.Component {

	handleGetOrdersForUser() {
		this.props.setOrderInfo(null);
		let userInfo = getCookieaccountinfo();
		instance.post('get-orders', {
		   token: userInfo.data.auth_token,
		   user_id: userInfo.data.id
		}).then(data => {
			this.props.setOrderInfo(data.data);
		});
	 }
	 
	 componentDidMount() {
		this.handleGetOrdersForUser();
	 }

	render() {
		if (!this.props.order) return (
			<div className="account-spinner">
				<Spinner animation="grow" variant="primary" />
			</div>
		);

		return (
			<>
				<div className='p-4 bg-white shadow-sm'>
					<h4 className="font-weight-bold mt-0 mb-4">Past Orders</h4>
					{
						this.props.order.length > 0 &&
						this.props.order.map(ord => (
							<OrderCard
							key={ord.unique_order_id}
							id={ord.id}
							user_id={ord.user_id}
							image={`${process.env.REACT_APP_IMAGE_URL}${ord.restaurant.image}`}
							imageAlt={ord.restaurant.name}
							orderNumber={ord.unique_order_id}
							orderTitle={ord.restaurant.name}
							address={JSON.parse(ord.location).address}
							orderProducts={ord.orderitems}
							orderTotal={ord.total.toString()}
							orderStatus={ord.orderstatus_id}
						/>
						))
					}

					{
						!this.props.order.length > 0 && 
						<p>No orders have been placed.</p>
					}
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		order: state.order
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setOrderInfo: (order) => dispatch({ type: 'ORDER_INFO', order })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);