const bcrypt = require('bcrypt');
const jwt = require('jwt-simple')
const { User } = require('../models');

const { environment } = require('../constants');

const SALT_ROUNDS = 10;

const auth = async (req, res, next) => {
  const access_token = req.headers.access_token;
  try {
    if (access_token) {
      const decodedPayload = jwt.decode(access_token, environment.JWT_SECRET_KEY);
      const user = await User.findOne({ where: { id: decodedPayload.id } });
      if (!user) {
        return res.status(401).send('Unauthorized');
      } {
        res.locals = { userId: decodedPayload.id }
        return next();
      }
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (e) {
    res.status(401).send('Unauthorized');
  }
}

const singIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email }, attributes: { exclude: 'passwordHash' } });
    if (!user) {
      return res.status(404).send('Not Found');
    }
    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
      const payload = { id: user.id };
      const token = jwt.encode(payload, environment.JWT_SECRET_KEY);
      return res.json({ profile: user, token });
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
    const payload = { id: user.id };
    const token = jwt.encode(payload, environment.JWT_SECRET_KEY);
    return res.json({ profile: user, token });
  } catch (error) {
    res.status(500).json(error);
  }
}

const getProfileData = async (req, res) => {
  try {
    const { userId } = res.locals;
    const user = await User.findOne({ where: { id: userId }, attributes: { exclude: 'passwordHash' } });
    if(!user) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(user);
  } catch(error) {
    res.status(500).json(error);
  }
}

module.exports = {
  singUp,
  singIn,
  auth,
  getProfileData
}
