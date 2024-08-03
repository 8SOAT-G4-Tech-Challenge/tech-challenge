import { OrderItem } from '@models/orderItem';
import {
	AddItemToCartRepositoryProps,
	UpdateCartItemRepositoryProps,
} from '@ports/input/cart';

export interface CartRepository {
	addItemToCart(product: AddItemToCartRepositoryProps): Promise<OrderItem>;
	updateCartItem(product: UpdateCartItemRepositoryProps): Promise<OrderItem>;
	deleteCartItem(id: string): Promise<void>;
	getCartItemById(id: string): Promise<OrderItem>;
	getAllCartItemsByOrderId(orderId: string): Promise<OrderItem[]>;
}
