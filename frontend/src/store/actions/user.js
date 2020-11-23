export const login = (name, group) => {
    return {
        type: 'LOGIN',
        name,
        group
    }
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
};