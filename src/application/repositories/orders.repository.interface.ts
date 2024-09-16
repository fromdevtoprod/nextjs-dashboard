import { CreatedOrder, SelectedOrder } from '@/src/entities/models/order';

export type OrderStatus = 'pending' | 'completed';
export type PaymentStatus = 'pending' | 'paid';
export type ProductType = 'care' | 'cure';

export type CreateOrderPayload = {
  customerId: string;
  date: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  productId: string;
  productType: ProductType;
};

export type UpdateOrderPayload = { id: string } & CreateOrderPayload;

export interface IOrdersRepository {
  createOrder(payload: CreateOrderPayload): Promise<CreatedOrder>;
  deleteOrder(id: string): Promise<void>;
  findAll(): Promise<SelectedOrder[]>;
  findOrderById(id: string): Promise<SelectedOrder>;
  updateOrder(payload: UpdateOrderPayload): Promise<CreatedOrder>;
}
