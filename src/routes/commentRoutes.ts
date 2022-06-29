import express from 'express';
import { body } from 'express-validator';
import checkAuth from '../middleware/auth';
import CategoryService from '../services/CategoryService';

const router = express.Router();

router.get('/:slug', checkAuth, async (req: any, res: express.Response) => {
  try {
    const categoryService = new CategoryService();

    const categories = await categoryService.getAll();

    return res.status(200).json({ categories });
  } catch (e) {
    res.status(400).json({ e });
  }
});

export default router;