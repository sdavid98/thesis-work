export const isTokenValid = (user) => {
    return user.expireDate * 1000 > Date.now();
};