import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Icofont from 'react-icofont';
import { connect } from 'react-redux';

class CheckoutItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.qty || 1,
      show: this.props.show || true,
      max: this.props.maxValue || 5,
      min: this.props.minValue || 0,
      price: this.props.price
    };
  }

  IncrementItem = () => {
    this.props.addQuantity(this.props.id);
  }
  DecreaseItem = () => {
    this.props.removeQuantity(this.props.id);
  }
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  }

  componentDidMount() {
    let price = 0;
    if (this.props.addons) {
      this.props.addons.map(add => {
        price += parseInt(add.price);
        return add;
      });
    }
    price += this.state.price;
    this.setState(prevState => ({
      price: price
    }));
  }

  render() {
    return (
      <div className="gold-members p-2 border-bottom">
        <p className="text-gray mb-0 float-right ml-2">{this.props.priceUnit}{this.state.price * this.props.qty}</p>
        <span className="count-number float-right">
          <Button variant="outline-secondary" onClick={this.DecreaseItem} className="btn-sm left dec"> <Icofont icon="minus" /> </Button>
          <input className="count-number-input" type="text" value={this.props.qty} readOnly />
          <Button variant="outline-secondary" onClick={this.IncrementItem} className="btn-sm right inc"> <Icofont icon="icofont-plus" /> </Button>
        </span>
        <div className="media">
          <div className="mr-2"></div>
          <div className="media-body">
            <p className="mt-1 mb-0 text-black">{this.props.itemName}</p>
          </div>
        </div>
      </div>
    );
  }
}

CheckoutItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  priceUnit: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
};
CheckoutItem.defaultProps = {
  show: true,
  priceUnit: 'Rs.'
}

const mapDispatchToProps = (dispatch) => {
  return {
    addQuantity: (uuid) => dispatch({ type: "ADD_QUANTITY", uuid }),
    removeQuantity: (uuid) => dispatch({ type: "SUB_QUANTITY", uuid })
  };
};

export default connect(null, mapDispatchToProps)(CheckoutItem);