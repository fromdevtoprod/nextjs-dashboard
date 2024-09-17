import { CreateOrderPayload } from '@/src/application/repositories/orders.repository.interface';
import { OrderEntity } from '@/src/entities/models/order';
import { OrdersRepository } from '@/src/infrastructure/repositories/orders.repository';

export async function createOrderUseCase(
  payload: CreateOrderPayload,
): Promise<OrderEntity> {
  return new OrdersRepository().createOrder(payload);
}
