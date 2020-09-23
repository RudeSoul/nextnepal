import React from 'react';
import {Row,Col, Spinner} from 'react-bootstrap';
// import CouponCard from '../common/CouponCard';
import { instance } from '../../utils/axios/instance';
import { getCookieaccountinfo } from '../../utils/jscookies';

class Wallet extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			wallet: null
		}
	}

	componentDidMount() {
		const userInfo = getCookieaccountinfo();
		instance.post('get-wallet-transactions', {
			token: userInfo.data.auth_token,
			user_id: userInfo.data.id
		}).then(data => {
			this.setState({
				wallet: data.data
			})
		}).catch(err => {
			console.log(err);
		});
	}

	render() {

		if (!this.state.wallet) return (
			<div className="account-spinner">
				<Spinner animation="grow" variant="primary" />
			</div>
		);

    	return (
    		<>
    		    <div className='p-4 bg-white shadow-sm'>
	              <Row>
	               <Col md={12}>
	                  <h3 className="font-weight-bold mt-0 mb-3">Wallet</h3>
					  <h4><strong>Available Balance : </strong> Rs. {this.state.wallet.balance}</h4>
	               </Col>
	            </Row>
			    </div>
		    </>
    	);
    }
}
export default Wallet;