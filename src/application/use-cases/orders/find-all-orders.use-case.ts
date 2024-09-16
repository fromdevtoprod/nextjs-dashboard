import { SelectedOrder } from '@/src/entities/models/order';
import { OrdersRepository } from '@/src/infrastructure/repositories/orders.repository';

export function findAllOrdersUseCase(): Promise<SelectedOrder[]> {
  return new OrdersRepository().findAll();
}
