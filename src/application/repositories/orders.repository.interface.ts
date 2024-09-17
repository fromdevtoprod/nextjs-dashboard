import {
  CreatedOrder,
  OrderEntity,
  SelectedOrder,
  UpdatedOrder,
} from '@/src/entities/models/order';

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

export type UpdateOrderPayload = {
  id: string;
  customerId?: string;
  date?: string;
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
  productId?: string;
  productType?: ProductType;
};

export type FindOrdersPayload = {
  customerId: string;
  status: OrderStatus;
  type: ProductType;
};

export interface IOrdersRepository {
  createOrder(payload: CreateOrderPayload): Promise<OrderEntity>;
  deleteOrder(id: string): Promise<void>;
  findAll(): Promise<SelectedOrder[]>;
  findOrderById(id: string): Promise<OrderEntity>;
  findOrderWithParameters(payload: FindOrdersPayload): Promise<SelectedOrder>;
  updateOrder(payload: UpdateOrderPayload): Promise<UpdatedOrder>;
}
