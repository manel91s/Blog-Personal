import Post from '../models/Post';
import { IPost } from '../types/types';

class PostService {
  private post: IPost | any;

  private posts: IPost[] | any;

  public async save(postDTO: IPost) {
    const post = new Post(postDTO);

    this.post = await post.save();

    return this.post;
  }

  public async update(post: IPost) {
    this.post = post.save();
    return this.post;
  }

  public async getAll() {
    this.posts = await Post.find({}).sort({ _id: 'desc' }).populate('id_user').populate('id_category')
      .populate('tags');

    return this.posts;
  }

  public async get(slug : string) {
    this.post = await Post.findOne({ slug });

    return this.post;
  }
}

export default PostService;
