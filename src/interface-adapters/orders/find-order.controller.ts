import { findOrderByIdUseCase } from '@/src/application/use-cases/orders/find-order.use-case';
import { OrderEntity } from '@/src/entities/models/order';

export async function findOrderByIdController(
  id: string,
): Promise<OrderEntity> {
  return findOrderByIdUseCase(id);
}
