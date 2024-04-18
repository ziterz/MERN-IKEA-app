import {
  beforeAll,
  beforeEach,
  afterAll,
  describe,
  test,
  expect,
} from '@jest/globals';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { productSeeder } from '../seeders/product.seeder';
import { userSeeder } from '../seeders/user.seeder';
import Category from '../models/Category/Category.model';
import Product from '../models/Product/Product.model';
import User from '../models/User/User.model';
import Cart from '../models/Cart/Cart.model';
import Order from '../models/Order/Order.model';

let adminCookie: string;
let userCookie: string;
let userId: mongoose.Types.ObjectId | undefined;
let productId: mongoose.Types.ObjectId | undefined;
let orderId: mongoose.Types.ObjectId | undefined;

beforeAll(async () => {
  await userSeeder();
  await productSeeder();

  const user = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user@mail.com', password: 'user123' });

  userCookie = user.header['set-cookie'][0];

  const admin = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@mail.com', password: 'admin123' });

  adminCookie = admin.header['set-cookie'][0];

  userId = await User.findOne({ email: 'user@mail.com' })
    .select('_id')
    .then((category) => {
      return category?._id;
    });

  productId = await Product.findOne()
    .select('_id')
    .then((product) => {
      return product?._id;
    });

  await Cart.create({
    user: userId,
    items: [{ product: productId, quantity: 1 }],
  });

  await request(app).post('/api/carts/checkout').set('Cookie', userCookie);

  orderId = await Order.findOne({ user: userId })
    .select('_id')
    .then((product) => {
      return product?._id;
    });
});

afterAll(async () => {
  await Category.deleteMany({});
  await Product.deleteMany({});
  await User.deleteMany({});
  await Cart.deleteMany({});
  await Order.deleteMany({});
  await mongoose.connection.close();
});

describe('SUCCESS: Get all orders by user', () => {
  test('GET /api/orders - It should return a list of orders', async () => {
    const response = await request(app)
      .get('/api/orders')
      .set('Cookie', userCookie);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('orders', expect.any(Array));
    expect(response.body.orders.length).toBeGreaterThan(0);
    expect(response.body.orders[0]).toHaveProperty('_id', expect.any(String));
    expect(response.body.orders[0]).toHaveProperty('user', expect.any(Object));
    expect(response.body.orders[0].user).toHaveProperty(
      '_id',
      expect.any(String)
    );
    expect(response.body.orders[0].user).toHaveProperty(
      'firstName',
      expect.any(String)
    );
    expect(response.body.orders[0].user).toHaveProperty(
      'lastName',
      expect.any(String)
    );
    expect(response.body.orders[0].user).toHaveProperty(
      'address',
      expect.any(String)
    );
    expect(response.body.orders[0].user).toHaveProperty(
      'postalCode',
      expect.any(String)
    );
    expect(response.body.orders[0].user).toHaveProperty(
      'email',
      expect.any(String)
    );
    expect(response.body.orders[0].user).toHaveProperty(
      'role',
      expect.any(String)
    );
    expect(response.body.orders[0].user).toHaveProperty(
      'phoneNumber',
      expect.any(String)
    );
    expect(response.body.orders[0]).toHaveProperty('items', expect.any(Array));
    expect(response.body.orders[0].items[0]).toHaveProperty(
      'product',
      expect.any(Object)
    );
    expect(response.body.orders[0].items[0].product).toHaveProperty(
      '_id',
      expect.any(String)
    );
    expect(response.body.orders[0].items[0].product).toHaveProperty(
      'name',
      expect.any(String)
    );
    expect(response.body.orders[0].items[0].product).toHaveProperty(
      'description',
      expect.any(String)
    );
    expect(response.body.orders[0].items[0].product).toHaveProperty(
      'price',
      expect.any(Number)
    );
    expect(response.body.orders[0].items[0].product).toHaveProperty(
      'stock',
      expect.any(Number)
    );
    expect(response.body.orders[0].items[0].product).toHaveProperty(
      'images',
      expect.any(Array)
    );
    expect(response.body.orders[0].items[0].product.images[0]).toEqual(
      expect.any(String)
    );
    expect(response.body.orders[0].items[0].product).toHaveProperty(
      'category',
      expect.any(Object)
    );
    expect(response.body.orders[0].items[0].product.category).toHaveProperty(
      '_id',
      expect.any(String)
    );
    expect(response.body.orders[0].items[0].product.category).toHaveProperty(
      'name',
      expect.any(String)
    );
    expect(response.body.orders[0].items[0].product.category).toHaveProperty(
      'image',
      expect.any(String)
    );
    expect(response.body.orders[0]).toHaveProperty(
      'totalPrice',
      expect.any(Number)
    );
    expect(response.body.orders[0]).toHaveProperty('status', 'pending');
    expect(response.body.orders[0]).toHaveProperty(
      'createdAt',
      expect.any(String)
    );
  });
});

describe('SUCCESS: Get orders by ID', () => {
  test('GET /api/orders - It should return an order by user', async () => {
    const response = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Cookie', userCookie);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('_id', expect.any(String));
    expect(response.body).toHaveProperty('user', expect.any(Object));
    expect(response.body.user).toHaveProperty('_id', expect.any(String));
    expect(response.body.user).toHaveProperty('firstName', expect.any(String));
    expect(response.body.user).toHaveProperty('lastName', expect.any(String));
    expect(response.body.user).toHaveProperty('address', expect.any(String));
    expect(response.body.user).toHaveProperty('postalCode', expect.any(String));
    expect(response.body.user).toHaveProperty('email', expect.any(String));
    expect(response.body.user).toHaveProperty('role', expect.any(String));
    expect(response.body.user).toHaveProperty(
      'phoneNumber',
      expect.any(String)
    );
    expect(response.body).toHaveProperty('items', expect.any(Array));
    expect(response.body.items[0]).toHaveProperty(
      'product',
      expect.any(Object)
    );
    expect(response.body.items[0].product).toHaveProperty(
      '_id',
      expect.any(String)
    );
    expect(response.body.items[0].product).toHaveProperty(
      'name',
      expect.any(String)
    );
    expect(response.body.items[0].product).toHaveProperty(
      'description',
      expect.any(String)
    );
    expect(response.body.items[0].product).toHaveProperty(
      'price',
      expect.any(Number)
    );
    expect(response.body.items[0].product).toHaveProperty(
      'stock',
      expect.any(Number)
    );
    expect(response.body.items[0].product).toHaveProperty(
      'images',
      expect.any(Array)
    );
    expect(response.body.items[0].product.images[0]).toEqual(
      expect.any(String)
    );
    expect(response.body.items[0].product).toHaveProperty(
      'category',
      expect.any(Object)
    );
    expect(response.body.items[0].product.category).toHaveProperty(
      '_id',
      expect.any(String)
    );
    expect(response.body.items[0].product.category).toHaveProperty(
      'name',
      expect.any(String)
    );
    expect(response.body.items[0].product.category).toHaveProperty(
      'image',
      expect.any(String)
    );
    expect(response.body).toHaveProperty('totalPrice', expect.any(Number));
    expect(response.body).toHaveProperty('status', 'pending');
    expect(response.body).toHaveProperty('createdAt', expect.any(String));
  });
});

describe('FAIL: Get orders by ID', () => {
  test('GET /api/orders - It should return a 404 error if the order is not found', async () => {
    const response = await request(app)
      .get('/api/orders/123456789012345678901234')
      .set('Cookie', userCookie);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Order not found');
  });

  test('GET /api/orders - It should return a 400 error if the order ID is invalid', async () => {
    const response = await request(app)
      .get('/api/orders/1234567890')
      .set('Cookie', userCookie);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('message', 'Invalid order id');
  });
});
