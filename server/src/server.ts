import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';

const port = process.env.PORT || 3000;

const main = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to MongoDB Successfully');
  app.listen(port, () => {
    console.log('Listening on port ' + process.env.PORT);
  });
};

main().catch((err) => console.log(err));
