const request = require('supertest');
const server = require('../server');
const config = require('../server/config');
const database = require('../server/database');
const { Model: User } = require('../server/api/v1/users/model');

describe('Users', () => {
  beforeAll(() => {
    database.connect({ url: `${config.database.url}-test` });
  });

  beforeEach(() => {
    // Create test data
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(() => {
    database.disconnect();
  });

  test('Sign Up', async () => {
    const response = await request(server).post('/api/users/signup').send({
      username: 'gmoralesc',
      name: 'Gustavo',
      lastname: 'Morales',
      email: 'gustavo.morales@yahoo.com',
      password: '12345678',
    });

    const { body } = response;
    const { id } = body;

    expect(id).not.toBeNull();
  });
});
