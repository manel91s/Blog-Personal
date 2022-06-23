import Post from '../models/Post';
import { IPost } from '../types/types';

class PostService {
  private postRecord : IPost | any;

  async save(postDTO: IPost) {
    this.postRecord = new Post(postDTO);

    const post = await this.postRecord.save();

    return { post };
  }
}

export default PostService;
