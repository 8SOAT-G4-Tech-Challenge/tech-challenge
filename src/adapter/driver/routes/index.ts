import { FastifyInstance } from 'fastify';

import {
	CustomerService,
	OrderService,
	ProductCategoryService,
	ProductService,
	UserService,
} from '@application/services';
import {
	CustomerRepositoryImpl,
	OrderRepositoryImpl,
	ProductCategoryRepositoryImpl,
	ProductRepositoryImpl,
	UserRepositoryImpl,
} from '@driven/infra';
import {
	CustomerController,
	OrderController,
	ProductCategoryController,
	ProductController,
	UserController,
} from '@driver/controllers';

import { SwaggerCreateCustomers, SwaggerGetCustomers, SwaggerGetCustomersProperty } from './doc/customer';
import { SwaggerGetOrders } from './doc/order';
import { SwaggerGetProducts } from './doc/product';
import { SwaggerCreateProductCategories, SwaggerGetProductCategories } from './doc/productCategory';
import { SwaggerGetUsers } from './doc/user';

const userRepository = new UserRepositoryImpl();
const customerRepository = new CustomerRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const orderRepository = new OrderRepositoryImpl();
const productCategoryRepository = new ProductCategoryRepositoryImpl();

const userService = new UserService(userRepository);
const customerService = new CustomerService(customerRepository);
const productCategoryService = new ProductCategoryService(productCategoryRepository);
const productService = new ProductService(productCategoryService, productRepository);
const orderService = new OrderService(orderRepository);

const userController = new UserController(userService);
const customerController = new CustomerController(customerService);
const productCategoryController = new ProductCategoryController(productCategoryService);
const productController = new ProductController(productService);
const orderController = new OrderController(orderService);

// Usem esse site para gerar o swagger a partir do JSON -> https://roger13.github.io/SwagDefGen/
export const routes = async (fastify: FastifyInstance) => {
	fastify.get(
		'/users',
		SwaggerGetUsers,
		userController.getUsers.bind(userController)
	);
	fastify.get(
		'/customers',
		SwaggerGetCustomers,
		customerController.getCustomers.bind(customerController)
	);
	fastify.get(
		'/customers/property',
		SwaggerGetCustomersProperty,
		customerController.getCustomerByProperty.bind(customerController)
	);
	fastify.post(
		'/customers',
		SwaggerCreateCustomers,
		customerController.createCustomer.bind(customerController)
	);
	fastify.get(
		'/products',
		SwaggerGetProducts,
		productController.getProducts.bind(productController)
	);
	fastify.post(
		'/product-categories',
		SwaggerCreateProductCategories,
		productCategoryController.createProductCategory.bind(productCategoryController)
	);
	fastify.get(
		'/product-categories',
		SwaggerGetProductCategories,
		productCategoryController.getProductCategories.bind(productCategoryController)
	);
	fastify.get(
		'/orders',
		SwaggerGetOrders,
		orderController.getOrders.bind(orderController)
	);
};
