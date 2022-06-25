import Post from '../models/Post';
import { IPost } from '../types/types';

class PostService {
  private post: IPost | any;

  private posts: IPost | any;

  async save(postDTO: IPost) {
    this.post = new Post(postDTO);

    const post = await this.post.save();

    return { post };
  }

  async update(post: IPost) {
    post.update();
  }

  async getAll() {
    this.posts = await Post.find({}).populate('id_user');

    return this.posts;
  }

  async get(slug : string) {
    this.post = await Post.findOne({ slug });

    return this.post;
  }
}

export default PostService;
