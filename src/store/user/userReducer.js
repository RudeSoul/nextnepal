const user = null;

const userReducer = (state = user, action) => {
    switch (action.type) {
        case 'USER_INFO':
            return {
                ...action.user
            }
        case 'REMOVE_USER_INFO':
            return null;
        default:
            return state;
    }
}

export default userReducer;