import { OrderStatus } from '@/src/application/repositories/orders.repository.interface';
import { OrdersRepository } from '@/src/infrastructure/repositories/orders.repository';

export type UpdateOrderStatusPayload = {
  orderId: string;
  orderStatus: OrderStatus;
};

export async function updateOrderStatusUseCase({
  orderId,
  orderStatus,
}: UpdateOrderStatusPayload) {
  return new OrdersRepository().updateOrderStatus(orderId, orderStatus);
}
