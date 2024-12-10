import { FastifyInstance } from 'fastify';

import {
	CartService,
	CustomerService,
	MercadoPagoService,
	OrderService,
	PaymentOrderService,
	ProductCategoryService,
	ProductService,
	UserService,
} from '@application/services';
import {
	CartRepositoryImpl,
	CustomerRepositoryImpl,
	FileSystemStorageImpl,
	OrderRepositoryImpl,
	ProductCategoryRepositoryImpl,
	ProductImageRepositoryImpl,
	ProductRepositoryImpl,
	UserRepositoryImpl,
} from '@driven/infra';
import {
	CartController,
	CustomerController,
	OrderController,
	ProductCategoryController,
	ProductController,
	UserController,
} from '@driver/controllers';
import { PaymentOrderRepositoryImpl } from '@src/adapter/driven/infra/paymentOrderRepositoryImpl';
import { EnvironmentService } from '@src/core/common/environmentService';

import { PaymentOrderController } from '../controllers/paymentOrderController';
import {
	SwaggerCreateCustomers,
	SwaggerDeleteCustomers,
	SwaggerGetCustomers,
	SwaggerGetCustomersProperty,
} from './doc/customer';
import {
	SwaggerCreateOrder,
	SwaggerGetOrders,
	SwaggerGetOrdersById,
	SwaggerUpdateOrder,
} from './doc/order';
import {
	SwaggerAddItemToCart,
	SwaggerDeleteOrderItem,
	SwaggerUpdateCartItem,
} from './doc/orderItem';
import {
	SwaggerGetPaymentOrderById,
	SwaggerGetPaymentOrderByOrderId,
	SwaggerGetPaymentOrders,
	SwaggerPaymentOrderMakePayment,
	SwaggerPaymentOrderProcessPaymentNotifications,
} from './doc/paymentOrders';
import {
	SwaggerCreateProducts,
	SwaggerDeleteProducts,
	SwaggerGetProducts,
	SwaggerUpdateProducts,
} from './doc/product';
import {
	SwaggerCreateProductCategories,
	SwaggerDeleteProductCategories,
	SwaggerGetProductCategories,
	SwaggerUpdateProductCategories,
} from './doc/productCategory';
import { SwaggerGetUsers } from './doc/user';

const userRepository = new UserRepositoryImpl();
const customerRepository = new CustomerRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
const orderRepository = new OrderRepositoryImpl();
const paymentOrderRepository = new PaymentOrderRepositoryImpl();
const productCategoryRepository = new ProductCategoryRepositoryImpl();
const productImageRepository = new ProductImageRepositoryImpl();
const fileSystemStorage = new FileSystemStorageImpl();
const cartRepository = new CartRepositoryImpl();

const userService = new UserService(userRepository);
const customerService = new CustomerService(customerRepository);
const productCategoryService = new ProductCategoryService(
	productCategoryRepository
);
const productService = new ProductService(
	productCategoryService,
	productRepository,
	productImageRepository,
	fileSystemStorage
);

const orderService = new OrderService(orderRepository, cartRepository);
const cartService = new CartService(
	cartRepository,
	orderRepository,
	productRepository
);

const environmentService = new EnvironmentService();

const mercadoPagoService = new MercadoPagoService(
	cartService,
	productService,
	environmentService
);

const paymentOrderService = new PaymentOrderService(
	paymentOrderRepository,
	orderRepository,
	orderService,
	mercadoPagoService
);

const userController = new UserController(userService);
const customerController = new CustomerController(customerService);
const productCategoryController = new ProductCategoryController(
	productCategoryService
);
const productController = new ProductController(productService);
const orderController = new OrderController(orderService);
const paymentOrderController = new PaymentOrderController(paymentOrderService);
const cartController = new CartController(cartService);

// Usem esse site para gerar o swagger a partir do JSON -> https://roger13.github.io/SwagDefGen/
export const routes = async (fastify: FastifyInstance) => {
	fastify.get(
		'/admin/users',
		SwaggerGetUsers,
		userController.getUsers.bind(userController)
	);
	fastify.get(
		'/admin/customers',
		SwaggerGetCustomers,
		customerController.getCustomers.bind(customerController)
	);
	fastify.get(
		'/totem/customers/property',
		SwaggerGetCustomersProperty,
		customerController.getCustomerByProperty.bind(customerController)
	);
	fastify.post(
		'/totem/customers',
		SwaggerCreateCustomers,
		customerController.createCustomer.bind(customerController)
	);
	fastify.delete(
		'/admin/customers/:id',
		SwaggerDeleteCustomers,
		customerController.deleteCustomer.bind(customerController)
	);
	fastify.get(
		'/totem/products',
		SwaggerGetProducts,
		productController.getProducts.bind(productController)
	);
	fastify.post(
		'/admin/products',
		SwaggerCreateProducts,
		productController.createProducts.bind(productController)
	);
	fastify.put(
		'/admin/products/:id',
		SwaggerUpdateProducts,
		productController.updateProducts.bind(productController)
	);
	fastify.delete(
		'/admin/products/:id',
		SwaggerDeleteProducts,
		productController.deleteProducts.bind(productController)
	);
	fastify.post(
		'/admin/product-categories',
		SwaggerCreateProductCategories,
		productCategoryController.createProductCategory.bind(
			productCategoryController
		)
	);
	fastify.get(
		'/totem/product-categories',
		SwaggerGetProductCategories,
		productCategoryController.getProductCategories.bind(
			productCategoryController
		)
	);
	fastify.put(
		'/admin/product-categories/:id',
		SwaggerUpdateProductCategories,
		productCategoryController.updateProductCategories.bind(
			productCategoryController
		)
	);
	fastify.delete(
		'/admin/product-categories/:id',
		SwaggerDeleteProductCategories,
		productCategoryController.deleteProductCategories.bind(
			productCategoryController
		)
	);
	fastify.get(
		'/admin/orders',
		SwaggerGetOrders,
		orderController.getOrders.bind(orderController)
	);
	fastify.get(
		'/totem/orders/:id',
		SwaggerGetOrdersById,
		orderController.getOrderById.bind(orderController)
	);
	fastify.post(
		'/totem/orders',
		SwaggerCreateOrder,
		orderController.createOrder.bind(orderController)
	);
	fastify.put(
		'/totem/orders/:id',
		SwaggerUpdateOrder,
		orderController.updateOrder.bind(orderController)
	);
	fastify.post(
		'/totem/order-items/:orderId',
		SwaggerAddItemToCart,
		cartController.addItemToCart.bind(cartController)
	);
	fastify.put(
		'/totem/order-items/:id',
		SwaggerUpdateCartItem,
		cartController.updateCartItem.bind(cartController)
	);
	fastify.delete(
		'/totem/order-items/:id',
		SwaggerDeleteOrderItem,
		cartController.deleteCartItem.bind(cartController)
	);
	fastify.get(
		'/admin/payment-orders',
		SwaggerGetPaymentOrders,
		paymentOrderController.getPaymentOrders.bind(paymentOrderController)
	);
	fastify.get(
		'/totem/payment-orders/:id',
		SwaggerGetPaymentOrderById,
		paymentOrderController.getPaymentOrderById.bind(paymentOrderController)
	);
	fastify.get(
		'/totem/orders/:orderId/payment-orders',
		SwaggerGetPaymentOrderByOrderId,
		paymentOrderController.getPaymentOrderByOrderId.bind(paymentOrderController)
	);
	fastify.post(
		'/totem/payment-orders/make-payment/:orderId',
		SwaggerPaymentOrderMakePayment,
		paymentOrderController.makePayment.bind(paymentOrderController)
	);
	fastify.post(
		'/totem/payment-orders/process-payment-notifications',
		SwaggerPaymentOrderProcessPaymentNotifications,
		paymentOrderController.processPaymentNotification.bind(
			paymentOrderController
		)
	);
};
