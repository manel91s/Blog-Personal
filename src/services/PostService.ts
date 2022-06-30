import Post from '../models/Post';
import { IPost } from '../types/types';

class PostService {


  public save(postDTO: IPost) {
    const post = new Post(postDTO);
    return post.save();    
  }

  public update(post: IPost) {
    return post.save();
  }

  public getAll() {
    return Post.find({}).sort({ _id: 'desc' }).populate('id_user').populate('id_category')
      .populate('tags');
  }

  public getPostBySlug(slug : string) {
    return Post.findOne({ slug });
  }

  public getComments() {

  }
}

export default PostService;
