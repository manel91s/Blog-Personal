import { ICategory } from '../types/types';
import Category from '../models/Category';

class CategoryService {
  private category: ICategory | any;

  private categories: ICategory[] | any;

  public async save(categoryDTO: ICategory) {
    const category = new Category(categoryDTO);

    this.category = await category.save();

    return this.category;
  }

  public async update(category: ICategory) {
    this.category = await category.update();
  }

  public async getAll() {
    this.categories = await Category.find({}).sort({ _id: 'desc' });

    return this.categories;
  }

  public async getCategoryBy(name: string) {
    this.category = await Category.findOne({ name });
    return this.category;
  }
}

export default CategoryService;
