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
import { Category } from '../models/Category.model';
import { Product } from '../models/Product.model';
import { User } from '../models/User.model';
import { Cart } from '../models/Cart.model';
import { Order } from '../models/Order.model';

let cookie: string;
let userId: mongoose.Types.ObjectId | undefined;
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

  userId = await User.findOne({ email: 'user@mail.com' })
    .select('_id')
    .then((category) => {
      return category?._id;
    });

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

  await Cart.create({
    user: userId,
    items: [{ product: productId, quantity: 1 }],
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

describe('SUCCESS: Get cart by user', () => {
  test('GET /api/carts - It should return user cart', async () => {
    const response = await request(app).get('/api/carts').set('Cookie', cookie);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('user', expect.any(String));
    expect(response.body.items).toBeInstanceOf(Array);
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
    expect(response.body.items[0].product.images).toBeInstanceOf(Array);
    expect(response.body.items[0].product.images).toContainEqual(
      expect.any(String)
    );
    expect(response.body.items[0]).toHaveProperty(
      'quantity',
      expect.any(Number)
    );
    expect(response.body.items[0].product.category).toBeInstanceOf(Object);
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
  });
});

describe('FAIL: Get cart by user', () => {
  test('GET /api/carts - It should return an unauthorized error', async () => {
    const response = await request(app).get('/api/carts');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not authorized');
  });
});

describe('SUCCESS: Update cart by user', () => {
  test('PATCH /api/carts - It should return an updated cart', async () => {
    const response = await request(app)
      .patch(`/api/carts`)
      .set('Cookie', cookie)
      .send({ productId, quantity: 1 });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Cart updated successfully');
  });
});

describe('FAIL: Update cart by user', () => {
  test('PATCH /api/carts - It should return an unauthorized error', async () => {
    const response = await request(app)
      .patch(`/api/carts`)
      .send({ productId, quantity: 1 });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not authorized');
  });

  test('PATCH /api/carts - It should return an invalid id format if empty', async () => {
    const response = await request(app)
      .patch(`/api/carts`)
      .set('Cookie', cookie)
      .send({ productId: '', quantity: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid product id');
  });

  test('PATCH /api/carts - It should return an invalid id format', async () => {
    const response = await request(app)
      .patch(`/api/carts`)
      .set('Cookie', cookie)
      .send({ productId: '123', quantity: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid product id');
  });

  test('PATCH /api/carts - It should return a product not found', async () => {
    const response = await request(app)
      .patch(`/api/carts`)
      .set('Cookie', cookie)
      .send({ productId: '666666666666666666666666', quantity: 1 });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });

  test('PATCH /api/carts - It should return a product is out of stock', async () => {
    const response = await request(app)
      .patch(`/api/carts`)
      .set('Cookie', cookie)
      .send({ productId: emptyStockProductId, quantity: 1 });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Product is out of stock');
  });
});

describe('FAIL: Update cart by user', () => {
  beforeEach(async () => {
    await Cart.deleteOne({ user: userId });
  });

  test('PATCH /api/carts - It should return a cart not found', async () => {
    const response = await request(app)
      .patch(`/api/carts`)
      .set('Cookie', cookie)
      .send({ productId, quantity: 1 });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Cart not found');
  });
});

describe('SUCCESS: Delete cart by user', () => {
  beforeEach(async () => {
    await Cart.create({
      user: userId,
      items: [{ product: productId, quantity: 1 }],
    });
  });

  test('DELETE /api/carts - It should return a deleted cart', async () => {
    const response = await request(app)
      .delete(`/api/carts`)
      .set('Cookie', cookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Cart deleted successfully');
  });
});

describe('FAIL: Delete cart by user', () => {
  test('DELETE /api/carts - It should return an unauthorized error', async () => {
    const response = await request(app).delete(`/api/carts`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not authorized');
  });
});

describe('SUCCESS: Checkout cart by user', () => {
  beforeEach(async () => {
    await Cart.create({
      user: userId,
      items: [{ product: productId, quantity: 1 }],
    });
  });

  test('POST /api/carts/checkout - It should return a success message', async () => {
    const response = await request(app)
      .post(`/api/carts/checkout`)
      .set('Cookie', cookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Checkout successful, please do payment'
    );
  });
});
