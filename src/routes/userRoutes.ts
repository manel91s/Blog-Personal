import express from 'express';
import { body } from 'express-validator';
import UserService from '../services/UserService';
import checkAuth from '../middleware/auth';
import {
  userValidation, validateToken, authUserValidation, validateParams,
} from '../utils/Validators';
import { generateJWT } from '../utils/generator';
import Uploader from '../middleware/uploader';

const router = express.Router();
const uploader = new Uploader();

router.post(
  '/',
  [body('name').notEmpty().trim().withMessage('El nombre no puede estar vacio')
    .escape(),
  body('surname').notEmpty().trim().withMessage('El apellido no puede estar vacio')
    .escape(),
  body('email').isEmail().withMessage('El campo email debe de estar correctamente informado'),
  body('password').isLength({ min: 8, max: 16 }).withMessage('El campo password tiene que tener entre 8 y 16 caracteres'),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('La contraseña de confirmación es incorrecta');
    }
    return true;
  }),
  ],
  userValidation,
  uploader.uploadSingleImage('avatar', 'photo'),
  async (req: express.Request, res: express.Response) => {
    try {
      const userDTO = req.body;

      const userService = new UserService();

      const { user } = await userService.register(userDTO);

      await userService.sendToken({
        email: user.email,
        confirmURL: `http://${req.hostname}/users/confirm/${user.token}`,
      });

      return res.status(200).json({ msg: 'Se ha enviado un email de confirmación' });
    } catch (e) {
      return res.status(400).json({ msg: e });
    }
  },
);

router.put(
  '/update',
  checkAuth,
  [body('name').notEmpty().trim().withMessage('El nombre no puede estar vacio')
    .escape(),
  body('surname').notEmpty().trim().withMessage('El apellido no puede estar vacio')
    .escape(),
  body('password').isLength({ min: 8, max: 16 }).withMessage('El campo password tiene que tener entre 8 y 16 caracteres'),
  body('newPassword').isLength({ min: 8, max: 16 }).withMessage('El campo password tiene que tener entre 8 y 16 caracteres'),
  body('passwordConfirmation').custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error('La contraseña de confirmación es incorrecta');
    }
    return true;
  }),
  ],
  authUserValidation,
  uploader.uploadSingleImage('avatar', 'photo'),
  async (req: any, res: express.Response) => {
    try {
      const { user } = req;
      const { name, surname, newPassword } = req.body;

      user.name = name;
      user.surname = surname;
      if (newPassword) {
        user.password = newPassword;
      }

      const userService = new UserService();
      userService.update(user);

      return res.status(200).json({ msg: 'Usuario actualizado correctamente' });
    } catch (e) {
      return res.status(400).json({ msg: e });
    }
  },
);

router.get(
  '/confirm/:token',
  validateToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const { token } = req.params;

      const userService = new UserService();

      await userService.updateToken(token);

      return res.status(200).json({ msg: 'Tu usuario ha sido confirmado' });
    } catch (e) {
      return res.status(400).json({ msg: e });
    }
  },
);

router.post(
  '/forgot-password',
  [body('email').isEmail().withMessage('El campo email debe de estar correctamente informado')],
  validateParams,
  async (req: express.Request, res: express.Response) => {
    try {
      const { email } = req.body;

      const userService = new UserService();

      const user = await userService.getUser(email);

      if (!user) {
        const error = new Error('El email no existe en la base de datos');
        return res.status(400).json({ msg: error.message });
      }
      await userService.generateToken();

      await userService.sendToken({
        email: user.email,
        confirmURL: `http://${req.hostname}/users/forgot-password/${user.token}`,
      });

      return res.status(200).json({ msg: 'Se ha enviado un email de confirmación' });
    } catch (e) {
      return res.status(400).json({ msg: e });
    }
  },
);

router.patch(
  '/restore-password',
  [
    body('newPassword').isLength({ min: 8, max: 16 }).withMessage('El campo password tiene que tener entre 8 y 16 caracteres'),
    body('passwordConfirmation').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('La contraseña de confirmación es incorrecta');
      }
      return true;
    })],
  validateParams,
  async (req: express.Request, res: express.Response) => {
    try {
      const { token, newPassword } = req.body;

      const userService = new UserService();

      const user = await userService.verify(token);

      if (!user) {
        const error = new Error('No se pudo restablecer la contraseña');
        return res.status(400).json({ msg: error.message });
      }
      await userService.updateToken(token);

      user.password = newPassword;
      userService.update(user);

      return res.status(200).json({ msg: 'Se ha enviado un email de confirmación' });
    } catch (e) {
      return res.status(400).json({ msg: e });
    }
  },
);

router.post(
  '/login',
  [body('email').isEmail().withMessage('El campo email debe de estar correctamente informado'),
    body('password').isLength({ min: 8, max: 16 }).withMessage('El campo password tiene que tener entre 8 y 16 caracteres')],
  authUserValidation,
  async (req: any, res: express.Response) => {
    const {
      _id, name, email,
    } = req.user;

    return res.json({
      _id,
      name,
      email,
      token: generateJWT(_id),
    });
  },
);

export default router;
