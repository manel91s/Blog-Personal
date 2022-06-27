import Tag from '../models/Tag';
import { ITag } from '../types/types';

class TagService {
  private tag: ITag | any;

  private tags: ITag[] | any;

  public async save(tagDTO: ITag) {
    const tag = new Tag(tagDTO);

    this.tag = await tag.save();

    return this.tag;
  }

  public async update(tag: ITag) {
    this.tag = tag.save();
    return this.tag;
  }

  public async getAll() {
    this.tags = await Tag.find({}).sort({ _id: 'desc' });

    return this.tags;
  }

  public async getTagBy(_id: string) {
    this.tag = await Tag.findOne({ _id });
    return this.tag;
  }

  public async getTagByName(name: string) {
    this.tag = await Tag.findOne({ name });
    return this.tag;
  }
}

export default TagService;
