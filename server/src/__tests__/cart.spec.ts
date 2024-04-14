import { beforeAll, afterAll, describe, test, expect } from '@jest/globals';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { productSeeder } from '../seeders/product.seeder';
import { userSeeder } from '../seeders/user.seeder';
import { Category } from '../models/Category.model';
import { Product } from '../models/Product.model';
import { User } from '../models/User.model';
import category from '../routes/category';

let cookie: string;
let productId: mongoose.Types.ObjectId | undefined;
let emptyStockProductId: mongoose.Types.ObjectId | undefined;
let categoryId: mongoose.Types.ObjectId | undefined;
let product = {
  name: 'TÄRNABY',
  description: 'Table lamp, 10 "',
  price: 250000,
  stock: 0,
  images: [
    'https://www.ikea.com/us/en/images/products/taernaby-table-lamp-dimmable-anthracite__1188962_pe899634_s5.jpg?f=xxs',
    'https://www.ikea.com/us/en/images/products/taernaby-table-lamp-dimmable-anthracite__0811972_pe771891_s5.jpg?f=xxs',
  ],
  category: categoryId,
};

beforeAll(async () => {
  await userSeeder();
  await productSeeder();

  const response = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user@mail.com', password: 'user123' });

  cookie = response.header['set-cookie'][0];

  categoryId = await Category.findOne()
    .select('_id')
    .then((category) => {
      return category?._id;
    });

  product = {
    ...product,
    category: categoryId?._id,
  };

  await Product.create(product);

  emptyStockProductId = await Product.findOne({ stock: 0 })
    .select('_id')
    .then((product) => {
      return product?._id;
    });

  productId = await Product.findOne()
    .select('_id')
    .then((product) => {
      return product?._id;
    });
});

afterAll(async () => {
  await Category.deleteMany({});
  await Product.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('SUCCESS: Create a new cart', () => {
  test('POST /api/carts It should return a new cart', async () => {
    const response = await request(app)
      .post('/api/carts')
      .set('Cookie', cookie)
      .send({ productId, quantity: 1 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product added to cart successfully');
  });
});

describe('FAIL: Create a new cart', () => {
  test('POST /api/carts = It should return an unauthorized error', async () => {
    const response = await request(app)
      .post('/api/carts')
      .send({ productId, quantity: 1 });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not authorized');
  });

  test('POST /api/carts - It should return an invalid id format if empty', async () => {
    const response = await request(app)
      .post('/api/carts')
      .set('Cookie', cookie)
      .send({ productId: '', quantity: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid product id');
  });

  test('POST /api/carts - It should return an invalid id format', async () => {
    const response = await request(app)
      .post('/api/carts')
      .set('Cookie', cookie)
      .send({ productId: '123', quantity: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid product id');
  });

  test('GET /api/carts - It should return a product not found', async () => {
    const response = await request(app)
      .post('/api/carts')
      .set('Cookie', cookie)
      .send({ productId: '666666666666666666666666', quantity: 1 });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });

  test('POST /api/carts - It should return a product is out of stock', async () => {
    const response = await request(app)
      .post('/api/carts')
      .set('Cookie', cookie)
      .send({ productId: emptyStockProductId, quantity: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Product is out of stock');
  });
});

// TODO: Write the test suite for the getCart controller
