import 'dotenv/config';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { User } from '../models/User.model';
import { hashPassword } from '../utils/bcrypt';

const user = {
  firstName: 'Ziady',
  lastName: 'Mubaraq',
  address: 'Jakarta',
  postalCode: '10000',
  phoneNumber: '08123456789',
  email: 'ziady@mail.com',
  password: 'ziadymubaraq',
  confirmPassword: 'ziadymubaraq',
};

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
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
    expect(response.body.user.firstName).toBe('Ziady');
    expect(response.body.user.lastName).toBe('Mubaraq');
    expect(response.body.user.address).toBe('Jakarta');
    expect(response.body.user.postalCode).toBe('10000');
    expect(response.body.user.phoneNumber).toBe('08123456789');
    expect(response.body.user.email).toBe('ziady@mail.com');
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
        email: 'ziady2@mail.com',
        confirmPassword: 'mubaraqziady',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Passwords do not match');
  });

  test('POST /api/auth/register - It should return an error if `firstName` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'ziady3@mail.com',
        firstName: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'User validation failed: firstName: Path `firstName` is required.'
    );
  });

  test('POST /api/auth/register - It should return an error if `lastName` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'ziady4@mail.com',
        lastName: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'User validation failed: lastName: Path `lastName` is required.'
    );
  });

  test('POST /api/auth/register - It should return an error if `address` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'ziady5@mail.com',
        address: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'User validation failed: address: Path `address` is required.'
    );
  });

  test('POST /api/auth/register - It should return an error if `postalCode` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'ziady6@mail.com',
        postalCode: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'User validation failed: postalCode: Path `postalCode` is required.'
    );
  });

  test('POST /api/auth/register - It should return an error if `email` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'User validation failed: email: Path `email` is required.'
    );
  });

  test('POST /api/auth/register - It should return an error if `password` is empty', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        ...user,
        email: 'ziady7@mail.com',
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
        email: 'ziady8@mail.com',
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
        email: 'ziady9@mail.com',
        phoneNumber: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      'User validation failed: phoneNumber: Path `phoneNumber` is required.'
    );
  });
});
