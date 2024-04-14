import 'dotenv/config';
import mongoose from 'mongoose';
import { productSeeder } from './product.seeder';
import { userSeeder } from './user.seeder';

const seeding = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
  await productSeeder();
  await userSeeder();
};

seeding().then(() => mongoose.connection.close());
