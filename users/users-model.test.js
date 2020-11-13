const User = require('./users-model.js');
const db = require('../database/dbConfig');
const { default: expectCt } = require('helmet/dist/middlewares/expect-ct');

beforeEach(async () => {
  await db('users').truncate();
});

describe('users model', () => {
  it('can ADD a user', async () => {
    await User.add({ username: 'aaa', password: 'meh' });
    let users = await db('users');
    expect(users).toHaveLength(1);

    await User.add({ username: 'bbb', password: 'meh' });
    users = await db('users');
    expect(users).toHaveLength(2);
  });

  it('can FIND by a userid');
});
