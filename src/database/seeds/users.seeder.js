import { Seeder } from 'mongoose-data-seed';
import userModel from '../../app/models/api/Users';

let data = [{
    name: 'Mamun Ahmed',
    mobile: '01400000000',
    email: 'admin@admin.com',
    password: '123123', password_confirmation: '123456',
    gender: '1',
    is_admin: '1',
    created_at: Date.now()
}, {
    name: 'Samin Ahmed',
    mobile: '01400000001',
    email: 'user@user.com',
    password: '123123', password_confirmation: '123456',
    gender: '1',
    is_admin: '0',
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
