import 'dotenv/config';
import mongoose from 'mongoose';
import { productSeeder } from './product.seeder';

const seeding = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  await productSeeder();
};

seeding().then(() => mongoose.connection.close());
