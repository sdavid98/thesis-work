const initUserState = {
    isLoggedIn: false,
    username: '',
    userGroup: ''
};
const user = (state = initUserState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                isLoggedIn: true,
                name: action.name,
                group: action.group
            };
        case 'LOGOUT':
            return {
                ...initUserState
            };
        default:
            return state;
    }
};

export default user;