import React from 'react';
import {Row,Col,Container} from 'react-bootstrap';
import PageTitle from '../components/common/PageTitle';
import CouponCard from '../components/common/CouponCard';
import BankOffers from '../components/common/BankOffers';

class Offers extends React.Component {

	render() {
    	return (
    		<>
	    		<PageTitle 
	    			title="Offers for you"
	    			subTitle="Explore top deals and offers exclusively for you!"
	    		/>
	    		<section className="section pt-5 pb-5">
			         <Container>
			            <Row>
			               <Col md={12}>
			                  <h4 className="font-weight-bold mt-0 mb-3">Available Coupons</h4>
			               </Col>
			               <Col md={4}>
			               	  <CouponCard 
								  title= 'Get 50% OFF on your first osahan eat order'
								  logoImage= 'img/bank/1.png'
								  subTitle= 'Use code WEDNEP50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: Rs200'
								  copyBtnText= 'COPY CODE'
								  couponCode= 'WEDNEP50'
			               	  />
			               </Col>
			               <Col md={4}>
			               	  <CouponCard 
								  title= 'Get 50% OFF on your first osahan eat order'
								  logoImage= 'img/bank/2.png'
								  subTitle= 'Use code EAT730 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: Rs600'
								  copyBtnText= 'COPY CODE'
								  couponCode= 'EAT730'
			               	  />
			               </Col>
			               <Col md={4}>
			               	  <CouponCard 
								  title= 'Get 50% OFF on your first osahan eat order'
								  logoImage= 'img/bank/3.png'
								  subTitle= 'Use code BANK30 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: Rs200'
								  copyBtnText= 'COPY CODE'
								  couponCode= 'BANK30'
			               	  />
			               </Col>
			               <Col md={4}>
			               	  <CouponCard 
								  title= 'Get 50% OFF on your first osahan eat order'
								  logoImage= 'img/bank/4.png'
								  subTitle= 'Use code CRICKET20NEPAL & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: Rs600'
								  copyBtnText= 'COPY CODE'
								  couponCode= 'CRICKET20NEPAL'
			               	  />
			               </Col>
			               <Col md={4}>
			               	  <CouponCard 
								  title= 'Get 50% OFF on your first osahan eat order'
								  logoImage= 'img/bank/5.png'
								  subTitle= 'Use code WEDNEP50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: Rs200'
								  copyBtnText= 'COPY CODE'
								  couponCode= 'WEDNEP50'
			               	  />
			               </Col>
			               <Col md={4}>
			               	  <CouponCard 
								  title= 'Get 50% OFF on your first osahan eat order'
								  logoImage= 'img/bank/6.png'
								  subTitle= 'Use code WEDNEP50 & get 50% off on your first osahan order on Website and Mobile site. Maximum discount: Rs200'
								  copyBtnText= 'COPY CODE'
								  couponCode= 'WEDNEP50'
			               	  />
			               </Col>
			            </Row>
			            <Row className="pt-5">
			               <Col xs={12}>
			                  <h4 className="font-weight-bold mt-0 mb-3">Bank Offers</h4>
			               </Col>
			               <Col md={6}>
			               	<BankOffers 
			               		title= 'Get flat Rs.30 cashback using Fone Pay'
								logoImage= 'img/bank/fonepay.jpg'
								imageclassName= 'card-img'
								subTitle= 'Get flat Rs.30 cashback on orders above Rs.99 for 10 orders. No code required.'
			               	/>
			               </Col>
			            </Row>
			         </Container>
			    </section>
	    	</>
    	);
    }
}


export default Offers;