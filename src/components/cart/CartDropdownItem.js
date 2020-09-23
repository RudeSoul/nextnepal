import React from 'react';
import PropTypes from 'prop-types';
import Icofont from 'react-icofont';

class CartDropdownItem extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      price: parseInt(this.props.price)
    }
  }

  componentDidMount() {
    let price = 0;
    if (this.props.addons && this.props.addons.length > 0) {
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
      <p className="mb-2">
        <Icofont icon={this.props.icoIcon} className={"mr-1 " + this.props.iconClass} />
        {this.props.title}
        <span className="float-right text-secondary">Rs.{this.state.price * this.props.qty}</span>
      </p>
    );
  }
}

CartDropdownItem.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  icoIcon: PropTypes.string.isRequired,
  iconclass: PropTypes.string.isRequired,
  qty: PropTypes.number.isRequired,
};

CartDropdownItem.defaultProps = {
  title: '',
  price: '',
  icoIcon: '',
  iconclass: '',
}


export default CartDropdownItem;