import mongooseLib from 'mongoose';

mongooseLib.Promise = global.Promise;

import Users from './src/database/seeds/users.seeder';
import config from './src/config/config';

const dbUri  = `${config.development.dbHost}:${config.development.dbPort}/${config.development.database}`;

// Export the mongoose lib
export const mongoose = mongooseLib;

// Export the mongodb url
export const mongoURL = process.env.MONGO_URL || dbUri;

/*
  Seeders List
  ------
  order is important
*/
export const seedersList = {
    Users
};
