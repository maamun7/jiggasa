import bcrypt from 'bcrypt';
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
/*

export default {
    generateHashPassword,
    makeCustomError
};*/
