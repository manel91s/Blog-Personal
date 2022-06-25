import express from 'express';
import { body } from 'express-validator';
import checkAuth from '../middleware/auth';
import Uploader from '../middleware/uploader';

import { canUpdatePost, validateParams } from '../utils/Validators';
import PostService from '../services/PostService';

const router = express.Router();
const uploader = new Uploader();

router.get('/', checkAuth, async (req: any, res: express.Response) => {
  try {
    const postService = new PostService();

    const posts = await postService.getAll();

    return res.status(200).json({ posts });
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
      postDTO.id_user = id;

      const postService = new PostService();

      const { post } = await postService.save(postDTO);

      return res.status(200).json({ post });
    } catch (e) {
      console.log(e);
    }
  },
);

router.put(
  '/update',
  checkAuth,
  canUpdatePost,
  [body('title').notEmpty().trim().withMessage('El titulo no puede estar vacio')
    .escape(),
  body('body').notEmpty().trim().withMessage('El cuerpo del texto no puede estar vacio')
    .escape()],
  validateParams,
  uploader.uploadSingleImage('post', 'image'),
  async (req: any, res: express.Response) => {
    try {
      const { post } = req;
      const { title, body } = req.body;

      post.title = title;
      post.body = body;

      const postService = new PostService();

      postService.update(post);

      return res.status(200).json({ post });
    } catch (e) {
      console.log(e);
    }
  },
);

export default router;
