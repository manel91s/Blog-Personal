import { validationResult } from 'express-validator';
import Post from '../models/Post';

import User from '../models/User';

const getValidationResult = async (req: any, res:any, next:any) => validationResult(req);

const validateParams = async (req: any, res:any, next:any) => {
  const errors = await getValidationResult(req, res, next);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  return next();
};

const userValidation = async (req: any, res:any, next:any) => {
 
  const errors = await getValidationResult(req, res, next);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  const userRegistered = await User.findOne({ email });

  if (userRegistered) {
    const error = new Error('El email ya existe en la base de datos');
    return res.status(400).json({ msg: error.message });
  }
  
  return next();
};

const validateToken = async (req: any, res:any, next:any) => {
    const { token } = req.params;

    const isValidToken = await User.findOne({ token });

    if (isValidToken) {
      return next();
    }
    const error = new Error('El token no es valido');
    return res.status(400).json({ msg: error.message });
  
};

const authUserValidation = async (req: any, res:any, next:any) => {
  const { email, password, id_rol } = req.body;
  console.log()
  const errors = await getValidationResult(req, res, next);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userRegistered = await User.findOne({ email });

    if (!userRegistered) {
      const error = new Error('El email no existe en la base de datos');
      return res.status(400).json({ msg: error.message });
    }

    if (!userRegistered.confirm) {
      const error = new Error('La cuenta de usuario todavía no ha sido confirmado');
      return res.status(400).json({ msg: error.message });
    }

    if (!await userRegistered.checkPassword(password)) {
      const error = new Error('La contraseña introducida es incorrecta');
      return res.status(400).json({ msg: error.message });
    }
    
    req.user = userRegistered;
 

  return next();
};

const canUpdatePost = async (req:any, res: any, next:any) => {
  const { slug } = req.body;
  const { _id } = req.user;
  const post = await Post.findOne({ slug });
 
  if (!post) {
    const error = new Error('Esta publicación no existe');
    return res.status(400).json({ msg: error.message });
  }

  if (post?.id_user.toString() !== _id.toString()) {
    const error = new Error('Este usuario no es propietario de esta publicación');
    return res.status(401).json({ msg: error.message });
  }

  req.post = post;

  return next();
};

export {
  validateParams, userValidation, validateToken, authUserValidation, canUpdatePost,
};
