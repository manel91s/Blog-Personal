import Comment from '../models/Comment';
import { IComment } from '../types/types';

class CommentService {

  public save(commentDTO: IComment) {
    const comment = new Comment(commentDTO);
    return comment.save();    
  }

  public getComments() {

  }

}
export default CommentService;