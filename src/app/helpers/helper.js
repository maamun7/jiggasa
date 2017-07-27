import bcrypt from 'bcrypt';
const generateHashPassword = plainTextPass => {
    return bcrypt.hashSync(plainTextPass, bcrypt.genSaltSync(10));
};

export default {
    generateHashPassword
};