import { beforeAll, afterAll, describe, test, expect } from '@jest/globals';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { Category } from '../models/Category.model';
import { Product } from '../models/Product.model';
import { User } from '../models/User.model';
import { productSeeder } from '../seeders/product.seeder';
import { userSeeder } from '../seeders/user.seeder';

let cookie: string;
let categoryId: mongoose.Types.ObjectId | undefined;
let productId: mongoose.Types.ObjectId | undefined;
let product = {
  name: 'TÄRNABY',
  description: 'Table lamp, 10 "',
  price: 250000,
  stock: 50,
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
    .send({ email: 'admin@mail.com', password: 'admin123' });

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

describe('SUCCESS: Create a new product', () => {
  test('POST /api/products - It should return a new product', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', cookie)
      .send(product);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Product created successfully');
    expect(response.body).toHaveProperty('product');
    expect(response.body.product).toHaveProperty('_id');
    expect(response.body.product).toHaveProperty('name', product.name);
    expect(response.body.product).toHaveProperty(
      'description',
      product.description
    );
    expect(response.body.product).toHaveProperty('price', product.price);
    expect(response.body.product).toHaveProperty('stock', product.stock);
    expect(response.body.product).toHaveProperty('images', expect.any(Array));
    expect(response.body.product.images[0]).toBe(product.images[0]);
    expect(response.body.product).toHaveProperty(
      'category',
      expect.any(Object)
    );
    expect(response.body.product.category).toHaveProperty(
      '_id',
      expect.any(String)
    );
    expect(response.body.product.category).toHaveProperty(
      'name',
      expect.any(String)
    );
    expect(response.body.product.category).toHaveProperty(
      'image',
      expect.any(String)
    );
  });
});

// TODO: Other products endpoint
