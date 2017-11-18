import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import jwt_decode from 'jwt-decode';

export const generateHashPassword = plainTextPass => {
    return bcrypt.hashSync(plainTextPass, bcrypt.genSaltSync(10));
};

export const makeCustomError = (error) => {
    if (error.name === 'ValidationError') {
        let customError = {};

        var spilitedErrorSmg = error.message.split(":");

        for (var key in spilitedErrorSmg) {
            //Match 'Error' string with each line first 5 characters

            if (spilitedErrorSmg[key].slice(0, 6).trim() == 'Error') {
                let trimStr = spilitedErrorSmg[key].replace('Value', '').trim();
                let spilitedWord = spilitedErrorSmg[key].replace('Value', '').trim().split(/`/)[1];
                customError[spilitedWord] = trimStr;
            }
        }

        return {success: false, msg: error._message, error: customError} ;
    }

    return;
};


//Generate Token
export const generateToken = (user) => {
    //1. Dont use password and other sensitive fields
    //2. Use fields that are useful in other parts of the
    var userObj = {
        name: user.name,
        email: user.email,
        _id: user.id.toString()
    };

    const token = jwt.sign(userObj, config.secretkey, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });

    return token;
};

//Decode Token
export const decodeToken = (token) => {
    const { _id } = jwt_decode(token);
    return _id;
};


