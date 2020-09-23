const order = null;

const orderReducer = (state = order, action) => {
    switch (action.type) {
        case 'ORDER_INFO':
            return action.order;
        default:
            return state;
    }
}

export default orderReducer;