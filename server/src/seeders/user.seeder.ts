import { User } from '../models/User.model';
import { hashPassword } from '../utils/bcrypt';

export const userSeeder = async () => {
  const user = [
    {
      firstName: 'Super',
      lastName: 'Admin',
      address: 'Jakarta',
      postalCode: '10250',
      phoneNumber: '081234567890',
      email: 'admin@mail.com',
      password: await hashPassword('admin123'),
      role: 'admin',
    },
    {
      firstName: 'Ziady',
      lastName: 'Mubaraq',
      address: 'Jakarta',
      postalCode: '10250',
      phoneNumber: '081234567890',
      email: 'user@mail.com',
      password: await hashPassword('user123'),
      role: 'user',
    },
  ];

  await User.deleteMany({});
  await User.insertMany(user);
  console.log('Seeding users completed');
};
