import { ICategory } from '../types/types';
import Category from '../models/Category';

class CategoryService {

  public save(categoryDTO: ICategory) {
    const category = new Category(categoryDTO);
    return category.save();
  }

  public update(category: ICategory) {
    return category.save();
  }

  public getAll() {
    return Category.find({}).sort({ _id: 'desc' });
  }

  public getCategoryBy(_id: string) : ICategory | any {
    return Category.findOne({ _id });
  }

  public getCategoryByName(name: string) {
    return Category.findOne({ name });
  }
}

export default CategoryService;
