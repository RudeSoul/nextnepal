import React from 'react';
import {Switch,Route} from 'react-router-dom';
import {NavLink,Link } from 'react-router-dom';
import {Row,Col,Container,Image} from 'react-bootstrap';
import Wallet from '../components/myaccount/Wallet';
import Orders from '../components/myaccount/Orders';
// import Favourites from '../components/myaccount/Favourites';
// import Payments from '../components/myaccount/Payments';
import Addresses from '../components/myaccount/Addresses';
import EditProfileModal from '../components/modals/EditProfileModal';
import { connect } from 'react-redux';

class MyAccount extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showEditProfile: false
    };
  }
  hideEditProfile = () => this.setState({ showEditProfile: false });

	render() {
    	return (
    		<>
        <EditProfileModal show={this.state.showEditProfile} onHide={this.hideEditProfile} name={this.props.user.data.name} phone={this.props.user.data.phone} email={this.props.user.data.email}/>
        <section className="section pt-4 pb-4 osahan-account-page">
           <Container>
              <Row>
                 <Col md={3}>
                    <div className="osahan-account-page-left shadow-sm bg-white h-100">
                       <div className="border-bottom p-4">
                          <div className="osahan-user text-center">
                             <div className="osahan-user-media">
                                <Image className="mb-3 rounded-pill shadow-sm mt-1" src={this.props.user.data.avatar || "/img/user/4.png"} alt={this.props.user.data.name} />
                                <div className="osahan-user-media-body">
                                   <h6 className="mb-2">{this.props.user.data.name}</h6>
                                   <p className="mb-1">{this.props.user.data.phone}</p>
                                   <p>{this.props.user.data.email}</p>
                                   <p className="mb-0 text-black font-weight-bold"><Link to='#' onClick={() => this.setState({ showEditProfile: true })} className="text-primary mr-3"><i className="icofont-ui-edit"></i> EDIT</Link></p>
                                </div>
                             </div>
                          </div>
                       </div>
                       <ul className="nav flex-column border-0 pt-4 pl-4 pb-4">
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/orders"><i className="icofont-food-cart"></i> Orders</NavLink>
                          </li>
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/wallet"><i className="icofont-sale-discount"></i> Wallet</NavLink>
                          </li>
                          {/* <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/favourites"><i className="icofont-heart"></i> Favourites</NavLink>
                          </li> */}
                          {/* <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/payments"><i className="icofont-credit-card"></i> Payments</NavLink>
                          </li> */}
                          <li className="nav-item">
                             <NavLink className="nav-link" activeClassName="active" exact to="/myaccount/addresses"><i className="icofont-location-pin"></i> Addresses</NavLink>
                          </li>
                       </ul>
                    </div>
                 </Col>
                 <Col md={9}>
                  <Switch>
                    <Route path="/myaccount/orders"  component={Orders} />
                    <Route path="/myaccount/wallet"  component={Wallet} />
                    {/* <Route path="/myaccount/favourites"  component={Favourites} /> */}
                    {/* <Route path="/myaccount/payments"  component={Payments} /> */}
                    <Route path="/myaccount/addresses"  component={Addresses} />
                  </Switch>
                 </Col>
              </Row>
           </Container>
        </section>
    		</>
    	);
    }
}


const mapStateToProps = (state) => {
   return {
      user: state.user
   }
}



export default connect(mapStateToProps, null)(MyAccount);