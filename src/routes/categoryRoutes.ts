import express from 'express';
import { body } from 'express-validator';
import checkAuth from '../middleware/auth';
import CategoryService from '../services/CategoryService';

const router = express.Router();

router.get('/', checkAuth, async (req: any, res: express.Response) => {
  try {
    const categoryService = new CategoryService();

    const categories = await categoryService.getAll();

    return res.status(200).json({ categories });
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.post('/save', checkAuth, [body('name').notEmpty().trim().withMessage('El nombre de la categoría no puede estar vacio')], async (req: any, res: express.Response) => {
  try {
    const categoryDTO = req.body;

    const categoryService = new CategoryService();

    if (await categoryService.getCategoryBy(categoryDTO.name)) {
      const error = new Error('El nombre de la categoria ya existe');
      return res.status(400).json({ msg: error.message });
    }
    const category = await categoryService.save(categoryDTO);

    return res.status(200).json({ category });
  } catch (e) {
    res.status(400).json({ e });
  }
});

export default router;
