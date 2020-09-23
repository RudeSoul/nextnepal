import uuid from 'react-uuid';
import { ADD_TO_CART, REMOVE_FROM_CART, ADD_QUANTITY, SUB_QUANTITY, EMPTY_CART } from './actionTypes';
const cart = {
    products: [],
    total: 0
};

const calculateTotal = (items, cart) => {
    let total = 0;
    if (cart) {
        total = parseInt(cart.price);
        if (cart.selectedaddons) {
            cart.selectedaddons.map(add => {
                total += parseInt(add.price);
                return add;
            });
        }

        total *= cart.quantity;
    }

    if (items.length > 0) {
        let price = 0;
        items.map(crt => {
            price = parseInt(crt.price);
            if (crt.selectedaddons) {
                crt.selectedaddons.map(add => {
                    price += parseInt(add.price);
                    return add;
                });
            }
            price *= crt.quantity;
            total += price;
            return crt;
        });

    }
    return total;
}

const addQ = (items, id) => {
    let temp = items.map(itm => {
        if (itm.uid === id) {
            itm.quantity += 1;
        }
        return itm;
    });
    return temp;
}

const removeQ = (items, id) => {
    let temp = items.map(itm => {
        if (itm.uid === id && itm.quantity > 1) {
            itm.quantity -= 1;
        }
        return itm;
    });
    return temp;
}

const ShoppinReducer = (state = cart, action) => {
    switch (action.type) {
        case "CART_POPULATE": 
            return {
                ...action.cart
            }
        case ADD_TO_CART:
            let newPrice = calculateTotal(state.products, action.cart);
            return {
                products: [
                    ...state.products,
                    {
                        ...action.cart,
                        uid: uuid()
                    }
                ],
                total: newPrice
            };
        case REMOVE_FROM_CART:
            return {
                ...state,
                products: state.products.map(product =>
                    product.id === action.id
                        ? { ...product, selected: false, quantity: 1 }
                        : product,
                ),
            };
        case ADD_QUANTITY:
            let newPCart = addQ(state.products, action.uuid);
            let addPrice = calculateTotal(newPCart, undefined);
            return {
                products: [...newPCart],
                total: addPrice
            };
        case SUB_QUANTITY:
            let remnewPCart = removeQ(state.products, action.uuid);
            let remPrice = calculateTotal(remnewPCart, undefined);
            return {
                products: [...remnewPCart],
                total: remPrice
            };
        case EMPTY_CART:
            return {
                products: [],
                total: 0
            }
        default:
            return state;
    }
};
export default ShoppinReducer;