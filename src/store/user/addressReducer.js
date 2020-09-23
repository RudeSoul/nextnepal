const addresses = null;

const addressReducer = (state = addresses, action) => {
    switch (action.type) {
        case 'ADDRESSES':
            return action.addresses;
        case 'ADD_ADDRESSES':
            return [
                ...state,
                action.addresses
            ];
        default:
            return state;
    }
}

export default addressReducer;