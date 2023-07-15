import { axiosInstance } from '../axiosInstance';
import { Category } from '../../../shared/types';

class CategoryService {
  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    const response = await axiosInstance.get('/categories');
    return response.data;
  }
}

export default new CategoryService();
