import { SelectedOrder } from '@/src/entities/models/order';
import { OrdersRepository } from '@/src/infrastructure/repositories/orders.repository';

export function findOrderByIdUseCase(id: string): Promise<SelectedOrder> {
  return new OrdersRepository().findOrderById(id);
}
