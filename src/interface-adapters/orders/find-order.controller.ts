import { findOrderByIdUseCase } from '@/src/application/use-cases/orders/find-order.use-case';
import { SelectedOrder } from '@/src/entities/models/order';

export async function findOrderByIdController(
  id: string,
): Promise<SelectedOrder> {
  return findOrderByIdUseCase(id);
}
