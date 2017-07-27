import { Seeder } from 'mongoose-data-seed';
import userModel from '../../app/models/api/Users';
import bcrypt from 'bcrypt';
let salt = bcrypt.genSaltSync(10);
let data = [{
    name: 'Mamun Ahmed',
    mobile: '01400000000',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('123456', salt),
    salt:salt,
    gender: '1',
    is_admin: '1',
    created_at: Date.now()
}];

class UsersSeeder extends Seeder {

  async shouldRun() {
    return userModel.count().exec().then(count => count === 0);
  }

  async run() {
    return userModel.create(data);
  }
}

export default UsersSeeder;
