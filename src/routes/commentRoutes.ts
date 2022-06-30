import express from 'express';
import { body } from 'express-validator';
import checkAuth from '../middleware/auth';
import PostService from '../services/PostService';
import CommentService from '../services/CommentService';
import { canUpdatePost } from '../utils/Validators';

const router = express.Router();

router.post('/save', checkAuth, canUpdatePost, async (req: any, res: express.Response) => {
  try {
   
    const post = req.post;
    const commentDTO = req.body;
    commentDTO.id_user = req.user._id;
   
    const commentService = new CommentService();
    const { _id } = await commentService.save(commentDTO);
    
    const postService = new PostService();
    post?.comments.push(_id);
    const updatePost = await postService.update(post);

    return res.status(200).json({ updatePost });
  } catch (e) {
    
    res.status(400).json({ e });
  }
});

export default router;