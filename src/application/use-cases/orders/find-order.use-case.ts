import { OrderEntity } from '@/src/entities/models/order';
import { OrdersRepository } from '@/src/infrastructure/repositories/orders.repository';

export function findOrderByIdUseCase(id: string): Promise<OrderEntity> {
  return new OrdersRepository().findOrderById(id);
}
