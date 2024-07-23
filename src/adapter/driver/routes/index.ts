import { FastifyInstance } from 'fastify';

import {
	CustomerService,
	OrderService,
	ProductService,
	UserService,
} from '@application/services';
import {
	CustomerRepositoryImpl,
	OrderRepositoryImpl,
	ProductRepositoryImpl,
	UserRepositoryImpl,
} from '@driven/infra';
import {
	CustomerController,
	OrderController,
	ProductController,
	UserController,
} from '@driver/controllers';

import { SwaggerCreateCustomers, SwaggerGetCustomers, SwaggerGetCustomersProperty } from './doc/customers';
import { SwaggerGetOrders } from './doc/orders';
import { SwaggerGetUsers } from './doc/users';

const userRepository = new UserRepositoryImpl();
const customerRepository = new CustomerRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const orderRepository = new OrderRepositoryImpl();

const userService = new UserService(userRepository);
const customerService = new CustomerService(customerRepository);
const productService = new ProductService(productRepository);
const orderService = new OrderService(orderRepository);

const userController = new UserController(userService);
const customerController = new CustomerController(customerService);
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
		productController.getProducts.bind(productController)
	);
	fastify.post(
		'/products/categories',
		productController.createProductCategory.bind(productController)
	);
	fastify.get(
		'/products/categories',
		productController.getProductCategories.bind(productController)
	);
	fastify.get(
		'/orders',
		SwaggerGetOrders,
		orderController.getOrders.bind(orderController)
	);
};
