import React from 'react';
import {Modal,Button} from 'react-bootstrap';
import { instance } from '../../utils/axios/instance';
import { getCookieaccountinfo } from '../../utils/jscookies';
import { connect } from 'react-redux';

class DeleteAddressModal extends React.Component {

	handleDelete = () => {
		// this.props.setAddresses(null);
		let userInfo = getCookieaccountinfo();
		instance.post('delete-address', {
			address_id: this.props.id,
			token: userInfo.data.auth_token,
			user_id: userInfo.data.id
		}).then(data => {
			this.props.setAddresses(data.data);
			this.props.onHide();
		}).catch(err => {
			alert(err);
		})
	}

	render() {
	
    	return (
	        <Modal 
	        	show={this.props.show} 
	        	onHide={this.props.onHide}
		        centered
		        size="sm"
		   	  >
			  <Modal.Header closeButton={true}>
			    <Modal.Title as='h5' id="delete-address">Delete</Modal.Title>
			  </Modal.Header>

			  <Modal.Body>
  				<p className="mb-0 text-black">Are you sure you want to delete this address?</p>   
			  </Modal.Body>

			  <Modal.Footer>
			    <Button type='button' onClick={this.props.onHide} variant="outline-primary" className="text-center justify-content-center">CANCEL</Button>
			    <Button type='button' variant="primary" className='text-center justify-content-center' onClick={this.handleDelete}>DELETE</Button>
			  </Modal.Footer>
			</Modal>
    	);
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		setAddresses: (addresses) => dispatch({type: 'ADDRESSES', addresses})
	}
}

export default connect(null, mapDispatchToProps)(DeleteAddressModal);