import express from 'express';
import { body } from 'express-validator';
import checkAuth from '../middleware/auth';
import Uploader from '../middleware/uploader';
import Post from '../models/Post';
import { validateParams } from '../utils/Validators';
import PostService from '../services/PostService';

const router = express.Router();
const uploader = new Uploader();
router.get('/', checkAuth, async (req: any, res: express.Response) => {
  try {
    console.log(req.user);
  } catch (e) {
    console.log(e);
  }
});

router.post(
  '/save',
  checkAuth,
  [body('title').notEmpty().trim().withMessage('El titulo no puede estar vacio')
    .escape(),
  body('body').notEmpty().trim().withMessage('El cuerpo del texto no puede estar vacio')
    .escape()],
  validateParams,
  uploader.uploadSingleImage('post', 'image'),
  async (req: any, res: express.Response) => {
    try {
      const { id } = req.user;
      const postDTO = req.body;
      postDTO.idUser = id;

      const postService = new PostService();

      const { post } = await postService.save(postDTO);

      return res.status(200).json({ post });
    } catch (e) {
      console.log(e);
    }
  },
);

export default router;
