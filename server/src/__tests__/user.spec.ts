import 'dotenv/config';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { User } from '../models/User.model';
import { hashPassword } from '../utils/bcrypt';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  await User.create({
    firstName: 'Ziady',
    lastName: 'Mubaraq',
    address: 'Jakarta',
    postalCode: '10250',
    phoneNumber: '081234567890',
    email: 'user@mail.com',
    password: await hashPassword('user123'),
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('SUCCESS: Register a new user', () => {
  test('POST /api/auth/register - It should return a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      firstName: 'Ziady',
      lastName: 'Mubaraq',
      address: 'Jakarta',
      postalCode: '10000',
      phoneNumber: '08123456789',
      email: 'ziady44454@mail.com',
      password: 'ziadymubaraq',
      confirmPassword: 'ziadymubaraq',
    });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
    expect(response.body.user).toBeDefined();
    expect(response.body.user.firstName).toBe('Ziady');
    expect(response.body.user.lastName).toBe('Mubaraq');
    expect(response.body.user.address).toBe('Jakarta');
    expect(response.body.user.postalCode).toBe('10000');
    expect(response.body.user.phoneNumber).toBe('08123456789');
    expect(response.body.user.email).toBe('ziady44454@mail.com');
    expect(response.body.user.role).toBe('user');
  });
});
