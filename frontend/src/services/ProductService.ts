import { CartItem, Product, WishListItem } from '../../../shared/types';
import { axiosInstance, getJWTHeader } from '../axiosInstance';
import { PriceRange } from '../components/Products/hooks/useProducts';
import { ResultCartItem } from '../models/types';

interface GetProductsArgs {
  category: string | undefined;
  sortBy: string;
  priceRange: PriceRange;
}

interface ICreateReview {
  token: string;
  id: string;
  data: {
    comment: string;
    rating: number;
  };
}

class ProductService {
  // For when we need a query function for useQuery
  async getProducts({
    category,
    sortBy,
    priceRange,
  }: GetProductsArgs): Promise<Product[]> {
    const { data } = await axiosInstance.get(
      `/products?category=${
        category === undefined ? 'all' : category
      }&sortBy=${sortBy}&minPrice=${priceRange.min}&maxPrice=${
        priceRange.max ?? ''
      }`
    );
    return data;
  }

  async getProductDetail(id: string): Promise<Product> {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  }

  async getProductsByIds(items: CartItem[]) {
    const products: ResultCartItem[] = [];

    for (const item of items) {
      const product = await this.getProductDetail(item.product as string);
      products.push({ product, quantity: item.quantity });
    }

    return products;
  }

  async getWishlistProductsById(items: WishListItem[]) {
    const products: Product[] = [];

    for (const item of items) {
      const product = await this.getProductDetail(item.product as string);
      products.push(product);
    }

    return products;
  }

  async createReview({ token, id, data }: ICreateReview) {
    const response = await axiosInstance.post(
      `/products/${id}/reviews`,
      data,
      getJWTHeader(token)
    );
    return response.data;
  }

  async getRelatedProducts(id: string): Promise<Product[]> {
    const response = await axiosInstance.get(`/products/${id}/related`);
    return response.data;
  }

  async getSearchedProducts(keyword: string): Promise<Product[]> {
    const response = await axiosInstance.get(`/products/search/${keyword}`);
    return response.data;
  }
}

export default new ProductService();
