import { validationResult } from 'express-validator';

import User from '../models/User';

const userValidation = async (req: any, res:any, next:any) => {
  const { email } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const userRegistered = await User.findOne({ email });

    if (userRegistered) {
      const error = new Error('El email ya existe en la base de datos');
      return res.status(400).json({ msg: error.message });
    }
  } catch (e) {
    res.status(400).json({ e });
  }

  return next();
};

const validateToken = async (req: any, res:any, next:any) => {
  const { token } = req.params;

  try {
    const isValidToken = await User.findOne({ token });

    if (isValidToken) {
      return next();
    }
    const error = new Error('El token no es valido');
    return res.status(400).json({ msg: error.message });
  } catch (e) {
    res.status(400).json({ e });
  }
};

const authUserValidation = async (req: any, res:any, next:any) => {
  const { email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
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
  } catch (e) {
    res.status(400).json({ e });
  }

  return next();
};

export { userValidation, validateToken, authUserValidation };
