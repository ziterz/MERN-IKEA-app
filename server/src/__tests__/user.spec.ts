import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { User } from '../models/User.model';
import { userSeeder } from '../seeders/user.seeder';

const user = {
  firstName: 'Jordan',
  lastName: 'Walke',
  address: 'San Francisco',
  postalCode: '94016',
  phoneNumber: '4257371234',
  email: 'jordwalke@mail.com',
  password: 'jordwalke',
  confirmPassword: 'jordwalke',
};

const admin = {
  firstName: 'Mark',
  lastName: 'Zuckerberg',
  address: 'Menlo Park',
  postalCode: '94025',
  phoneNumber: '6505434800',
  email: 'zuckerberg@mail.com',
  password: 'zuckerberg',
  confirmPassword: 'zuckerberg',
  role: 'admin',
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  await userSeeder();
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('SUCCESS: Register a new user', () => {
  test('POST /api/auth/register - It should return a new user', async () => {
    const response = await request(app).post('/api/auth/register').send(user);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
    expect(response.body.user).toBeDefined();
    expect(response.body.user.firstName).toBe('Jordan');
    expect(response.body.user.lastName).toBe('Walke');
    expect(response.body.user.address).toBe('San Francisco');
    expect(response.body.user.postalCode).toBe('94016');
    expect(response.body.user.phoneNumber).toBe('4257371234');
    expect(response.body.user.email).toBe('jordwalke@mail.com');
    expect(response.body.user.role).toBe('user');
  });
});

describe('FAIL: Register a new user', () => {
  test('POST /api/auth/register - It should return an error if the email is already registered', async () => {
    const response = await request(app).post('/api/auth/register').send(user);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  test('POST /api/auth/register - It should return an error if the password does not match', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'jordwalke1@mail.com',
        confirmPassword: 'walkejordan',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Passwords do not match');
  });

  test('POST /api/auth/register - It should return an error if `firstName` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'jordwalke2@mail.com',
        firstName: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('First Name is a required field');
  });

  test('POST /api/auth/register - It should return an error if `lastName` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'jordwalke3@mail.com',
        lastName: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Last Name is a required field');
  });

  test('POST /api/auth/register - It should return an error if `address` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'jordwalke4@mail.com',
        address: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Address is a required field');
  });

  test('POST /api/auth/register - It should return an error if `postalCode` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'jordwalke5@mail.com',
        postalCode: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Postal Code is a required field');
  });

  test('POST /api/auth/register - It should return an error if `email` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email is a required field');
  });

  test('POST /api/auth/register - It should return an error if `email` is not valid', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'jord@walke@meta.com',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'jord@walke@meta.com is not a valid email address'
    );
  });

  test('POST /api/auth/register - It should return an error if `password` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'jordwalke6@mail.com',
        password: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Passwords do not match');
  });

  test('POST /api/auth/register - It should return an error if `confirmPassword` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'jordwalke7@mail.com',
        confirmPassword: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Passwords do not match');
  });

  test('POST /api/auth/register - It should return an error if `phoneNumber` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'jordwalke8@mail.com',
        phoneNumber: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Phone Number is required field');
  });

  test('POST /api/auth/register - It should return an error if `phoneNumber` is not valid', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'jordwalke9@mail.com',
        phoneNumber: 'ABCGDSDW',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('ABCGDSDW is not a valid phone number');
  });
});

describe('SUCCESS: Register a new admin', () => {
  test('POST /api/auth/register - It should return a new admin', async () => {
    const response = await request(app).post('/api/auth/register').send(admin);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
    expect(response.body.user).toBeDefined();
    expect(response.body.user.firstName).toBe('Mark');
    expect(response.body.user.lastName).toBe('Zuckerberg');
    expect(response.body.user.address).toBe('Menlo Park');
    expect(response.body.user.postalCode).toBe('94025');
    expect(response.body.user.phoneNumber).toBe('6505434800');
    expect(response.body.user.email).toBe('zuckerberg@mail.com');
    expect(response.body.user.role).toBe('admin');
  });
});

describe('FAIL: Register a new admin', () => {
  test('POST /api/auth/register - It should return an error if the email is already registered', async () => {
    const response = await request(app).post('/api/auth/register').send(admin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  test('POST /api/auth/register - It should return an error if the password does not match', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...admin,
        email: 'zuckerberg1@mail.com',
        confirmPassword: 'markzuckerberg',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Passwords do not match');
  });

  test('POST /api/auth/register - It should return an error if `firstName` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...admin,
        email: 'zuckerberg2@mail.com',
        firstName: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('First Name is a required field');
  });

  test('POST /api/auth/register - It should return an error if `lastName` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...admin,
        email: 'zuckerberg3@mail.com',
        lastName: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Last Name is a required field');
  });

  test('POST /api/auth/register - It should return an error if `address` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...admin,
        email: 'zuckerberg4@mail.com',
        address: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Address is a required field');
  });

  test('POST /api/auth/register - It should return an error if `postalCode` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...admin,
        email: 'zuckerberg5@mail.com',
        postalCode: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Postal Code is a required field');
  });

  test('POST /api/auth/register - It should return an error if `email` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...admin,
        email: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email is a required field');
  });

  test('POST /api/auth/register - It should return an error if `email` is not valid', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...admin,
        email: 'mark@zuckerberg@meta.com',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'mark@zuckerberg@meta.com is not a valid email address'
    );
  });

  test('POST /api/auth/register - It should return an error if `password` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'zuckerberg6@mail.com',
        password: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Passwords do not match');
  });

  test('POST /api/auth/register - It should return an error if `confirmPassword` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'zuckerberg7@mail.com',
        confirmPassword: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Passwords do not match');
  });

  test('POST /api/auth/register - It should return an error if `phoneNumber` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'zuckerberg8@mail.com',
        phoneNumber: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Phone Number is required field');
  });

  test('POST /api/auth/register - It should return an error if `phoneNumber` is not valid', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'zuckerberg9@mail.com',
        phoneNumber: 'PQRSTUVWXY',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'PQRSTUVWXY is not a valid phone number'
    );
  });
});

describe('SUCCESS: Login a user', () => {
  test('POST /api/auth/login - It should return a user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'user@mail.com',
      password: 'user123',
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.user).toBeDefined();
    expect(response.body.user.firstName).toBe('Ziady');
    expect(response.body.user.lastName).toBe('Mubaraq');
    expect(response.body.user.address).toBe('Jakarta');
    expect(response.body.user.postalCode).toBe('10250');
    expect(response.body.user.phoneNumber).toBe('081234567890');
    expect(response.body.user.email).toBe('user@mail.com');
    expect(response.body.user.role).toBe('user');
    expect(response.body.user.password).toBeUndefined();
  });
});

describe('FAIL: Login a user', () => {
  test('POST /api/auth/login - It should return an error if the email is not registered or the password is incorrect', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'example@mail.com',
      password: 'examplepassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  });

  test('POST /api/auth/login - It should return an error if the email is empty', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'example@mail.com',
      password: '',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  });

  test('POST /api/auth/login - It should return an error if the password is empty', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: '',
      password: 'examplepassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  });
});
