import jwt from 'jsonwebtoken';
import express from 'express';
import dotenv from 'dotenv';
import User from '../models/User';
import { jwtIdPayload } from '../types/types';

dotenv.config();

const checkAuth = async (req: any, res: express.Response, next: () => void) => {
  let token;
  // Si hay token en los headers:
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // eslint-disable-next-line prefer-destructuring
      token = req.headers.authorization.split(' ')[1];

      const { id } = jwt.verify(token, `${process.env.JWT_SECRET}`) as jwtIdPayload;

      req.user = await User.findById(id).select('-password -confirmado -token -createdAt -updatedAt');

      return next();
    } catch (error) {
      return res.status(404).json({ msg: 'Hubo un error' });
    }
  }

  if (!token) {
    const error = new Error('Token no valido');
    return res.status(401).json({ error: error.message });
  }
  next();
};

export default checkAuth;
