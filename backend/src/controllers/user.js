const bcrypt = require('bcrypt');
const jwt = require('jwt-simple')
const { User } = require('../models');

const SALT_ROUNDS = 10;
const SECRET_KEY = 'secret-key';

const singIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send('Not Found');
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
      const payload = { id: user.id };
      const token = jwt.encode(payload, SECRET_KEY);
      return res.json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

const singUp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req?.body.password, SALT_ROUNDS);
    const user = await User.create({
      firstName: req?.body.firstName,
      lastName: req?.body.lastName,
      email: req?.body.email,
      passwordHash: hashedPassword
    });
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  singUp,
  singIn
}
