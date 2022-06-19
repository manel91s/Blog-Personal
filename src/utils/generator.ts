import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateJWT = (id: string) => jwt.sign({ id }, `${process.env.JWT_SECRET}`, {
  expiresIn: '30d',
});

const generateId = () => {
  const random = Date.now().toString(32);
  const date = Math.random().toString(32).substring(2);
  return random + date;
};

export { generateId, generateJWT };
