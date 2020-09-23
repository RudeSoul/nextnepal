import React from 'react';
import {Link} from 'react-router-dom';
import {Card,Media} from 'react-bootstrap';
import Icofont from 'react-icofont';
import PropTypes from 'prop-types'; 

class ChooseAddressCard extends React.Component {

	render() {
    	return (
        <Card className={"bg-white addresses-item mb-4 " + (this.props.boxClass)}>
            <div className="gold-members p-4">
               <Media>
                  <div className="mr-3"><Icofont icon={this.props.icoIcon} className={this.props.iconclassName} /></div>
                  <div className="media-body">
                     <h6 className="mb-1 text-secondary">{this.props.title}</h6>
                     <p className="text-black">{this.props.address}
                     </p>
                     	{(this.props.is_operational)?
	                        (<><Link className="btn btn-sm btn-success mr-2" to="#" onClick={() => this.props.onDeliverHere(this.props.add)}> DELIVER HERE </Link> {this.props.current && (
                            this.props.current.id === this.props.id && <Icofont icon="check-circled" className="text-success"/>
                          )}</>)
	                        : (<><p className="text-error">Not available on this address</p></>)
                     	}
                  </div>
               </Media>
            </div>
        </Card>
    	);
    }
}

ChooseAddressCard.propTypes = {
  title: PropTypes.string.isRequired,
  icoIcon: PropTypes.string.isRequired,
  iconclassName: PropTypes.string,
  address: PropTypes.string,
  onDeliverHere: PropTypes.func,
  onAddNewClick: PropTypes.func,
  is_operational: PropTypes.number.isRequired
};

ChooseAddressCard.defaultProps = {
  	type:'hasAddress'
}


export default ChooseAddressCard;
