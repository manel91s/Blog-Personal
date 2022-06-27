import express from 'express';
import { body } from 'express-validator';
import checkAuth from '../middleware/auth';
import TagService from '../services/TagService';

const router = express.Router();

router.post('/save', checkAuth, [body('name').notEmpty().trim().withMessage('El nombre del tag no puede estar vacio')], async (req: any, res: express.Response) => {
  try {
    const tagDTO = req.body;

    const tagService = new TagService();

    if (await tagService.getTagByName(tagDTO.name)) {
      const error = new Error('El nombre del tag ya existe');
      return res.status(400).json({ msg: error.message });
    }
    const tag = await tagService.save(tagDTO);

    return res.status(200).json({ tag });
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.get('/', checkAuth, async (req: any, res: express.Response) => {
  try {
    const tagService = new TagService();

    const tags = await tagService.getAll();

    return res.status(200).json({ tags });
  } catch (e) {
    res.status(400).json({ e });
  }
});

router.put('/update/:id', checkAuth, [body('name').notEmpty().trim().withMessage('El nombre del tag no puede estar vacio')], async (req: any, res: express.Response) => {
  try {
    const { id } = req.params;
    const tagDTO = req.body;

    const tagService = new TagService();
    const tagExists = await tagService.getTagBy(id);

    if (tagExists.name.toLowerCase() === tagDTO.name.toLowerCase()) {
      const error = new Error('El nombre del tag ya existe');
      return res.status(400).json({ msg: error.message });
    }
    tagExists.name = tagDTO.name;
    const tag = await tagService.update(tagExists);

    return res.status(200).json({ tag });
  } catch (e) {
    res.status(400).json({ e });
  }
});

export default router;
