import { beforeAll, afterAll, describe, test, expect } from '@jest/globals';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app';
import { Category } from '../models/Category.model';
import { Product } from '../models/Product.model';
import { User } from '../models/User.model';
import { productSeeder } from '../seeders/product.seeder';
import { userSeeder } from '../seeders/user.seeder';

let adminCookie: string;
let userCookie: string;
let fakeCookie =
  'auth_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjFjMjUxYmE1NzM2ZjliOWIxMTliNzciLCJpYXQiOjE3MTMxMjA1NDcsImV4cCI6MTcxNTcxMjU0N30.lqnuRC4xwoTuSzBs7zZNWu8I8_6YxrRKOUwmcZiXPt4; Path=/; HttpOnly;';
let categoryId: mongoose.Types.ObjectId | undefined;
const category = {
  name: 'Lighting',
  image:
    'https://www.ikea.com/global/assets/range-categorisation/images/wall-lights-20503.jpeg?imwidth=300',
};

beforeAll(async () => {
  await userSeeder();
  await productSeeder();

  categoryId = await Category.findOne()
    .select('_id')
    .then((category) => {
      return category?._id;
    });

  const admin = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin@mail.com', password: 'admin123' });

  adminCookie = admin.header['set-cookie'][0];

  const user = await request(app)
    .post('/api/auth/login')
    .send({ email: 'user@mail.com', password: 'user123' });

  userCookie = user.header['set-cookie'][0];
});

afterAll(async () => {
  await Category.deleteMany({});
  await Product.deleteMany({});
  await User.deleteMany({});
  await mongoose.connection.close();
});

describe('SUCCESS: Create a new category', () => {
  test('POST /api/categories - It should return a new category', async () => {
    const response = await request(app)
      .post('/api/categories')
      .set('Cookie', adminCookie)
      .send(category);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('category');
    expect(response.body.category).toHaveProperty('_id');
    expect(response.body.category).toHaveProperty('name', category.name);
    expect(response.body.category).toHaveProperty('image', category.image);
    expect(response.body.message).toBe('Category created successfully');
  });
});

describe('FAIL: Create a new category', () => {
  test('POST /api/categories - It should return an unauthorized error', async () => {
    const response = await request(app).post('/api/categories').send(category);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not authorized');
  });

  test('POST /api/categories - It should return an unauthorized error', async () => {
    const response = await request(app)
      .post('/api/categories')
      .set('Cookie', fakeCookie)
      .send(category);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not authorized');
  });

  test('POST /api/categories - It should return a forbidden access error', async () => {
    const response = await request(app)
      .post('/api/categories')
      .set('Cookie', userCookie)
      .send(category);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden access');
  });

  test('POST /api/categories - It should return an error if `name` is empty', async () => {
    const response = await request(app)
      .post('/api/categories')
      .set('Cookie', adminCookie)
      .send({ ...category, name: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Name is a required field');
  });

  test('POST /api/categories - It should return an error if `image` is empty', async () => {
    const response = await request(app)
      .post('/api/categories')
      .set('Cookie', adminCookie)
      .send({ ...category, image: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Image is a required field');
  });
});

describe('SUCCESS: Get all categories', () => {
  test('GET /api/categories - It should return all categories', async () => {
    const response = await request(app).get('/api/categories');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('categories');
    expect(response.body.categories.length).toBeGreaterThan(0);
    expect(response.body.categories[0]).toHaveProperty('_id');
    expect(response.body.categories[0]).toHaveProperty(
      'name',
      expect.any(String)
    );

    expect(response.body.categories[0]).toHaveProperty(
      'image',
      expect.any(String)
    );
  });
});

describe('SUCCESS: Get a category by ID', () => {
  test('GET /api/categories/:id - It should return a category', async () => {
    const response = await request(app).get(`/api/categories/${categoryId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('name', expect.any(String));
    expect(response.body).toHaveProperty('image', expect.any(String));
  });
});

describe('FAIL: Get a category by ID', () => {
  test('GET /api/categories/:id - It should return an invalid id format', async () => {
    const response = await request(app).get('/api/categories/123');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid category id');
  });

  test('GET /api/categories/:id - It should return a category not found', async () => {
    const response = await request(app).get(
      '/api/categories/666666666666666666666666'
    );

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Category not found');
  });
});

describe('SUCCESS: Update a category', () => {
  test('PUT /api/categories/:id - It should return an updated category', async () => {
    const response = await request(app)
      .put(`/api/categories/${categoryId}`)
      .set('Cookie', adminCookie)
      .send({
        name: 'Furniture',
        image:
          'https://www.ikea.com/global/assets/range-categorisation/images/wall-lights-20503.jpeg?imwidth=300',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Category updated successfully');
    expect(response.body).toHaveProperty('category');
    expect(response.body.category).toHaveProperty('_id');
    expect(response.body.category).toHaveProperty('name', 'Furniture');
    expect(response.body.category).toHaveProperty('image', expect.any(String));
  });
});

describe('FAIL: Update a category', () => {
  test('PUT /api/categories/:id - It should return an unauthorized error', async () => {
    const response = await request(app)
      .put(`/api/categories/${categoryId}`)
      .send({
        name: 'Furniture',
        image:
          'https://www.ikea.com/global/assets/range-categorisation/images/wall-lights-20503.jpeg?imwidth=300',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not authorized');
  });

  test('PUT /api/categories/:id - It should return a forbidden access error', async () => {
    const response = await request(app)
      .put(`/api/categories/${categoryId}`)
      .set('Cookie', userCookie)
      .send({
        name: 'Furniture',
        image:
          'https://www.ikea.com/global/assets/range-categorisation/images/wall-lights-20503.jpeg?imwidth=300',
      });

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden access');
  });

  test('PUT /api/categories/:id - It should return an invalid id format', async () => {
    const response = await request(app)
      .put('/api/categories/123')
      .set('Cookie', adminCookie)
      .send(category);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid category id');
  });

  test('PUT /api/categories/:id - It should return a category not found', async () => {
    const response = await request(app)
      .put('/api/categories/666666666666666666666666')
      .set('Cookie', adminCookie)
      .send(category);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Category not found');
  });

  test('PUT /api/categories/:id - It should return an error if `name` is empty', async () => {
    const response = await request(app)
      .put(`/api/categories/${categoryId}`)
      .set('Cookie', adminCookie)
      .send({ ...category, name: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Name is a required field');
  });

  test('PUT /api/categories/:id - It should return an error if `image` is empty', async () => {
    const response = await request(app)
      .put(`/api/categories/${categoryId}`)
      .set('Cookie', adminCookie)
      .send({ ...category, image: '' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Image is a required field');
  });
});

describe('SUCCESS: Delete a category', () => {
  test('DELETE /api/categories/:id - It should return a success message', async () => {
    const response = await request(app)
      .delete(`/api/categories/${categoryId}`)
      .set('Cookie', adminCookie);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Category deleted successfully');
  });
});

describe('FAIL: Delete a category', () => {
  test('DELETE /api/categories/:id - It should return an unauthorized error', async () => {
    const response = await request(app).delete(`/api/categories/${categoryId}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('User not authorized');
  });

  test('DELETE /api/categories/:id - It should return a forbidden access error', async () => {
    const response = await request(app)
      .delete(`/api/categories/${categoryId}`)
      .set('Cookie', userCookie);

    expect(response.status).toBe(403);
    expect(response.body.message).toBe('Forbidden access');
  });

  test('DELETE /api/categories/:id - It should return an invalid id format', async () => {
    const response = await request(app)
      .delete('/api/categories/123')
      .set('Cookie', adminCookie);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid category id');
  });

  test('DELETE /api/categories/:id - It should return a category not found', async () => {
    const response = await request(app)
      .delete('/api/categories/666666666666666666666666')
      .set('Cookie', adminCookie);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Category not found');
  });
});
