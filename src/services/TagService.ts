import Tag from '../models/Tag';
import { ITag } from '../types/types';

class TagService {

  public save(tagDTO: ITag) {
    const tag = new Tag(tagDTO);
    return tag.save();
  }

  public update(tag: ITag) {
    return tag.save();
  }

  public getAll() {
    return Tag.find({}).sort({ _id: 'desc' });
  }

  public getTagBy(_id: string) {
    return Tag.findOne({ _id });
  }

  public getTagByName(name: string) {
    return Tag.findOne({ name });
  }
}

export default TagService;
