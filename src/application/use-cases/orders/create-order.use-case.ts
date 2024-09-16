import { CreateOrderPayload } from '@/src/application/repositories/orders.repository.interface';
import { CreatedOrder } from '@/src/entities/models/order';
import { OrdersRepository } from '@/src/infrastructure/repositories/orders.repository';

export async function createOrderUseCase(
  payload: CreateOrderPayload,
): Promise<CreatedOrder> {
  return new OrdersRepository().createOrder(payload);
}
