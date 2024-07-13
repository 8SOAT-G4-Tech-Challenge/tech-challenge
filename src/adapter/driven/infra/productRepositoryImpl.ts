import { prisma } from '@driven/infra/lib/prisma';
import { ProductRepository } from '@ports/productRepository';
import { ProductCategory } from '@domains/productCategory';
import { Product } from '@domains/product';

export class ProductRepositoryImpl implements ProductRepository {

    async getProducts(): Promise<Product[]> {
        return prisma.product.findMany({
            select: {
                id: true,
                name: true,
                amount: true,
                descrption: true,
                category: true,
                createdAt: true,
                updatedAt: true,
            },
        })
    };

    async createProductCategory(productCategory: ProductCategory): Promise<ProductCategory> {
        return prisma.productCategory.create({
            data: productCategory,
        });
    };

    async getProductCategories(): Promise<ProductCategory[]> {
        return prisma.productCategory.findMany({
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
            }
        });
    };
}