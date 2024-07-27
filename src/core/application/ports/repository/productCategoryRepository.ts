import { ProductCategory } from '@src/core/domain/models/productCategory';

export interface ProductCategoryRepository {
    createProductCategory(productCategory: ProductCategory): Promise<ProductCategory>;
    getProductCategories(): Promise<ProductCategory[]>;
    getProductCategoryByName(name: string): Promise<ProductCategory | null>;
}
