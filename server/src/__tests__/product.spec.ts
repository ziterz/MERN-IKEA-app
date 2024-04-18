import { beforeAll, afterAll, describe, test, expect } from '@jest/globals';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import Category from '../models/Category/Category.model';
import Product from '../models/Product/Product.model';
import User from '../models/User/User.model';
import { productSeeder } from '../seeders/product.seeder';
import { userSeeder } from '../seeders/user.seeder';

let adminCookie: string;
let userCookie: string;
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

  const admin = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@mail.com', password: 'admin123' });

  adminCookie = admin.header['set-cookie'][0];

  const user = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user@mail.com', password: 'user123' });

  userCookie = user.header['set-cookie'][0];

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
      .set('Cookie', adminCookie)
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

describe('FAIL: Create a new product', () => {
  test('POST /api/products - It should return an unauthorized error', async () => {
    const response = await request(app).post('/api/products').send(product);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not authorized');
  });

  test('POST /api/products - It should return a forbidden access error', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', userCookie)
      .send(product);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden access');
  });

  test('POST /api/products - It should return an error if `name` is empty', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', adminCookie)
      .send({ ...product, name: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Name is a required field');
  });

  test('POST /api/products - It should return an error if `description` is empty', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', adminCookie)
      .send({ ...product, description: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Description is a required field');
  });

  test('POST /api/products - It should return an error if `price` is empty', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', adminCookie)
      .send({ ...product, price: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Price is a required field');
  });

  test('POST /api/products - It should return an error if `price` is not an integer value', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', adminCookie)
      .send({ ...product, price: 'ABC' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Price must be an integer value');
  });

  test('POST /api/products - It should return an error if `stock` is empty', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', adminCookie)
      .send({ ...product, stock: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Stock is a required field');
  });

  test('POST /api/products - It should return an error if `stock` is not an integer value', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', adminCookie)
      .send({ ...product, stock: 'ABC' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Stock must be an integer value');
  });

  test('POST /api/products - It should return an error if `images` is empty', async () => {
    const response = await request(app)
      .post('/api/products')
      .set('Cookie', adminCookie)
      .send({ ...product, images: [] });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Images must have at least 2 values');
  });
});

describe('SUCCESS: Get all products', () => {
  test('GET /api/products - It should return all products', async () => {
    const response = await request(app).get('/api/products');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('products');
    expect(response.body.products.length).toBeGreaterThan(0);
    expect(response.body.products[0]).toHaveProperty('_id');
    expect(response.body.products[0]).toHaveProperty(
      'name',
      expect.any(String)
    );
    expect(response.body.products[0]).toHaveProperty(
      'description',
      expect.any(String)
    );
    expect(response.body.products[0]).toHaveProperty(
      'price',
      expect.any(Number)
    );
    expect(response.body.products[0]).toHaveProperty(
      'stock',
      expect.any(Number)
    );
    expect(response.body.products[0]).toHaveProperty(
      'images',
      expect.any(Array)
    );
    expect(response.body.products[0].images[0]).toEqual(expect.any(String));
    expect(response.body.products[0]).toHaveProperty(
      'category',
      expect.any(Object)
    );
    expect(response.body.products[0].category).toHaveProperty(
      '_id',
      expect.any(String)
    );
    expect(response.body.products[0].category).toHaveProperty(
      'name',
      expect.any(String)
    );
    expect(response.body.products[0].category).toHaveProperty(
      'image',
      expect.any(String)
    );
  });
});

describe('SUCCESS: Get a product by ID', () => {
  test('GET /api/products/:id - It should return a product', async () => {
    const response = await request(app).get(`/api/products/${productId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('name', expect.any(String));
    expect(response.body).toHaveProperty('description', expect.any(String));
    expect(response.body).toHaveProperty('price', expect.any(Number));
    expect(response.body).toHaveProperty('stock', expect.any(Number));
    expect(response.body).toHaveProperty('images', expect.any(Array));
    expect(response.body.images[0]).toEqual(expect.any(String));
    expect(response.body).toHaveProperty('category', expect.any(Object));
    expect(response.body.category).toHaveProperty('_id', expect.any(String));
    expect(response.body.category).toHaveProperty('name', expect.any(String));
    expect(response.body.category).toHaveProperty('image', expect.any(String));
  });
});

describe('FAIL: Get a product by ID', () => {
  test('GET /api/products/:id - It should return an error if product id is invalid', async () => {
    const response = await request(app).get('/api/products/123');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid product id');
  });

  test('GET /api/products/:id - It should return an error if product is not found', async () => {
    const response = await request(app).get(
      `/api/products/666666666666666666666666`
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });
});

describe('SUCCESS: Update a product', () => {
  test('PUT /api/products/:id - It should return an updated product', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, name: 'Updated product' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Product updated successfully');
    expect(response.body).toHaveProperty('product');
    expect(response.body.product).toHaveProperty('_id');
    expect(response.body.product).toHaveProperty('name', 'Updated product');
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

describe('FAIL: Update a product', () => {
  test('PUT /api/products/:id - It should return an unauthorized error', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .send({ ...product, name: 'Updated product' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not authorized');
  });

  test('PUT /api/products/:id - It should return a forbidden access error', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', userCookie)
      .send({ ...product, name: 'Updated product' });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden access');
  });

  test('PUT /api/products/:id - It should return an error if product id is invalid', async () => {
    const response = await request(app)
      .put('/api/products/123')
      .set('Cookie', adminCookie)
      .send({ ...product, name: 'Updated product' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid product id');
  });

  test('PUT /api/products/:id - It should return an error if product is not found', async () => {
    const response = await request(app)
      .put(`/api/products/666666666666666666666666`)
      .set('Cookie', adminCookie)
      .send({ ...product, name: 'Updated product' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });

  test('PUT /api/products/:id - It should return an error if `name` is empty', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, name: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Name is a required field');
  });

  test('PUT /api/products/:id - It should return an error if `description` is empty', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, description: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Description is a required field');
  });

  test('PUT /api/products/:id - It should return an error if `price` is empty', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, price: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Price is a required field');
  });

  test('PUT /api/products/:id - It should return an error if `price` is not an integer value', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, price: 'ABC' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Price must be an integer value');
  });

  test('PUT /api/products/:id - It should return an error if `stock` is empty', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, stock: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Stock is a required field');
  });

  test('PUT /api/products/:id - It should return an error if `stock` is not an integer value', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, stock: 'ABC' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Stock must be an integer value');
  });

  test('PUT /api/products/:id - It should return an error if `images` is empty', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, images: [] });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Images must have at least 2 values');
  });

  test('PUT /api/products/:id - It should return an error if `category` is empty', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, category: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid category id');
  });

  test('PUT /api/products/:id - It should return an error if `category` is invalid', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, category: '123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid category id');
  });

  test('PUT /api/products/:id - It should return an error if `category` is not found', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, category: '666666666666666666666666' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Category not found');
  });

  test('PUT /api/products/:id - It should return an error if `category` is not a valid ObjectId', async () => {
    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Cookie', adminCookie)
      .send({ ...product, category: 'ABC' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid category id');
  });
});

describe('SUCCESS: Delete a product', () => {
  test('DELETE /api/products/:id - It should return a success message', async () => {
    const response = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Cookie', adminCookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(`Product with id ${productId} deleted`);
  });
});

describe('FAIL: Delete a product', () => {
  test('DELETE /api/products/:id - It should return an unauthorized error', async () => {
    const response = await request(app).delete(`/api/products/${productId}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not authorized');
  });

  test('DELETE /api/products/:id - It should return a forbidden access error', async () => {
    const response = await request(app)
      .delete(`/api/products/${productId}`)
      .set('Cookie', userCookie);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden access');
  });

  test('DELETE /api/products/:id - It should return an error if product id is invalid', async () => {
    const response = await request(app)
      .delete('/api/products/123')
      .set('Cookie', adminCookie);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid product id');
  });

  test('DELETE /api/products/:id - It should return an error if product is not found', async () => {
    const response = await request(app)
      .delete(`/api/products/666666666666666666666666`)
      .set('Cookie', adminCookie);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Product not found');
  });
});
