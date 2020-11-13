const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

const { jwtSecret } = require('./secrets.js');

const Users = require('../users/users-model');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const user = { username, password: hash };
    const addedUser = await Users.add(user);
    res.status(201).json(addedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const [user] = await Users.findBy({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = makeToken(user);
      res.json({ message: `Logged in!, ${user.username}`, token });
    } else {
      res.status(401).json({ message: 'You shall not pass!' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

function makeToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };
  const options = {
    expiresIn: '20 min',
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
