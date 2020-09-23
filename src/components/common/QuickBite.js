import React from 'react';
import { Image, Badge, Button, Media, Modal, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Icofont from 'react-icofont';
import { connect } from 'react-redux';
import { removeCookieCart } from '../../utils/jscookies';

class QuickBite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.qty || 1,
      show: this.props.show || true,
      max: this.props.maxValue || 99999,
      min: this.props.minValue || 1,
      showModal: false,
      addonsItems: [],
      singleItems: {},
      prompt: false,
    };
  }

  IncrementItem = () => {
    if (this.state.quantity >= this.state.max) {

    } else {
      this.setState({
        quantity: this.state.quantity + 1
      });
      this.props.getValue({ id: this.props.id, quantity: (this.state.quantity + 1) });
    }
  }
  DecreaseItem = () => {
    if (this.state.quantity <= (this.state.min)) {

    } else {
      this.setState({ quantity: this.state.quantity - 1 });
      this.props.getValue({ id: this.props.id, quantity: (this.state.quantity - 1) });
    }
  }

  componentDidMount() {

  }

  HandleAdd = () => {
    let item = this.props.items;
    if (this.props.cart) {
      let check = this.props.cart.filter(crt => crt.restaurant_id !== item.restaurant_id);
      if (check.length > 0) {
        this.setState({
          prompt: true
        });
        return;
      }
    }
    this.setState({
      showModal: true
    })
  }

  HandleClose = () => {
    this.setState({
      showModal: false,
      addonsItems: [],
      quantity: 1
    });
  }

  AddAddon = (e, add) => {
    if (e.target.checked) {
      let item = {
        addon_category_name: add.name,
        addon_id: add.id,
        addon_name: add.name,
        price: add.price
      }
      this.setState(prevState => ({
        addonsItems: [...prevState.addonsItems, item]
      }));
    } else {
      this.setState(prevState => ({
        addonsItems: [...prevState.addonsItems.filter(itm => itm.addon_id !== add.id)]
      }));
    }
  }

  AddToCart = () => {
    let item = this.props.items;
    item['quantity'] = this.state.quantity;
    item['selectedaddons'] = [];
    if (this.state.addonsItems.length > 0) {
      item['selectedaddons'] = this.state.addonsItems;
    }
    if (Object.keys(this.state.singleItems).length > 0) {
      item['selectedaddons'].push(this.state.singleItems);
    }
    this.props.setCart(item);
    this.HandleClose();
  }

  AddSingleAddon = (add) => {
    let item = {
      addon_category_name: add.name,
      addon_id: add.id,
      addon_name: add.name,
      price: add.price
    }
    this.setState({
      singleItems: item
    });
  }

  closePropmt() {
    this.setState({
      prompt: false
    });
  }

  handleClearCart() {
    this.props.clearCart();
    removeCookieCart();
    this.setState({
      prompt: false,
      showModal: true,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className={"p-3 border-bottom " + this.props.itemClass}>
        <span className="float-right">
          <Button variant='outline-secondary' onClick={() => this.HandleAdd()} size="sm">ADD</Button>
        </span>
        <Media>
          {this.props.image ?
            <Image className={"mr-3 rounded-pill " + this.props.imageClass} src={this.props.image} alt={this.props.imageAlt} />
            :
            ""
          }
          <div className="mr-1">
            <Icofont icon="ui-press" className={`food-item ${this.props.is_veg? "text-success" : "text-danger"}`}/>
          </div>
          <Media.Body>
            <h6 className="mb-1">
              {this.props.title}
              {this.props.is_new ? <Badge className="ml-2" variant="primary">new</Badge> : ""}
              {this.props.is_popular ? <Badge className="ml-2" variant="secondary">popular</Badge> : ""}
              {this.props.is_recommended ? <Badge className="ml-2" variant="warning">recommended</Badge> : ""}
            </h6>
            <p className="text-gray mb-0">{this.props.items.old_price && <del>{this.props.items.old_price}</del>} {this.props.priceUnit}{this.props.price}</p>
          </Media.Body>
        </Media>

        <Modal
          show={this.state.showModal}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            {this.props.items.name} <span className="float-right"><Button onClick={this.HandleClose}>x</Button></span>
          </Modal.Header>
          <Modal.Body>
            <div className="mt-3">
              {
                !this.props.items.service_name && 
                <React.Fragment>
                  <Button type="button" className="mr-2" onClick={this.DecreaseItem}>-</Button> {this.state.quantity} <Button className="ml-2" type="button" onClick={this.IncrementItem}>+</Button>
                </React.Fragment>
              }
              <Button className="ml-2" onClick={this.AddToCart} >Add To Cart</Button>
            </div>
          </Modal.Body>
        </Modal>
        
        {/* Different restaurant prompt */}
        <Modal
          show={this.state.prompt}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>Cart Item Issue</Modal.Header>
          <Modal.Body>
            <p>You are trying to add item from two different restaurant. Before proceeding please clear the cart item. If you press cancel button you cannot proceed to add new item from another restaurant.</p>
            <Button type="button" className="btn btn-primary mr-3" onClick={() => this.closePropmt()}>Cancel</Button>
            <Button type="button" className="btn btn-primary-outlined" onClick={() => this.handleClearCart()}>Clear Cart</Button>
          </Modal.Body>
        </Modal>
        {/* Different restaurant prompt */}
      </div>
      <Row>
      {
          this.props.items.galleryImages && JSON.parse(this.props.items.galleryImages).map((img, index) => (
            <Col key={index} sm={4}>
              <img src={`${process.env.REACT_APP_IMAGE_URL}/${img}`} alt={this.props.name} className="w-100"/>
            </Col>
          ))
        }
      </Row>
      </React.Fragment>
    );
  }
}


QuickBite.propTypes = {
  itemClass: PropTypes.string,
  title: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  image: PropTypes.string,
  imageClass: PropTypes.string,
  showBadge: PropTypes.bool,
  badgeVariant: PropTypes.string,
  badgeText: PropTypes.string,
  price: PropTypes.number.isRequired,
  priceUnit: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  qty: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  items: PropTypes.object,
  is_new: PropTypes.number,
  is_popular: PropTypes.number,
  is_recommended: PropTypes.number,
  is_veg: PropTypes.number,
  is_active: PropTypes.number
};
QuickBite.defaultProps = {
  itemClass: 'gold-members',
  imageAlt: '',
  imageClass: '',
  showBadge: false,
  price: '',
  priceUnit: '$',
  showPromoted: false,
  badgeVariant: 'danger'
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCart: (cart) => dispatch({ type: "ADD_TO_CART", cart }),
    clearCart: () => dispatch({type: 'EMPTY_CART'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuickBite);