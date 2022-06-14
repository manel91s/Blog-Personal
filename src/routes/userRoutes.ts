import express from 'express';
import { body } from 'express-validator';
import dotenv from 'dotenv';
import UserService from '../services/UserService';
import { userValidation, validateToken, authUserValidation } from '../utils/Validators';

dotenv.config();

const router = express.Router();

router.post(
  '/',
  [body('name').notEmpty().trim().withMessage('El nombre no puede estar vacio')
    .escape(),
  body('surname').notEmpty().trim().withMessage('El apellido no puede estar vacio')
    .escape(),
  body('email').isEmail().withMessage('El campo email debe de estar correctamente informado'),
  body('password').isLength({ min: 8, max: 16 }).withMessage('El campo password tiene que tener entre 8 y 16 caracteres'),
  ],
  userValidation,
  async (req: express.Request, res: express.Response) => {
    try {
      const userDTO = req.body;

      const userService = new UserService();

      const { user } = await userService.register(userDTO);

      await userService.sendToken({
        email: user.email,
        confirmURL: `http://${req.hostname}/user/confirm/${user.token}`,
      });

      return res.status(200).json({ user });
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
  '/login',
  [body('email').isEmail().withMessage('El campo email debe de estar correctamente informado'),
    body('password').isLength({ min: 8, max: 16 }).withMessage('El campo password tiene que tener entre 8 y 16 caracteres')],
  authUserValidation,
  async (req: express.Request, res: express.Response) => {
    const { email } = req.body;
  },
);

export default router;
