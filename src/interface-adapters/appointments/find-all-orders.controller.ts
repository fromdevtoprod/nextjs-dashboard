import { findAllOrdersUseCase } from '@/src/application/use-cases/orders/find-all-orders.use-case';
import { SelectedOrder } from '@/src/entities/models/order';

export async function findAllOrdersController(): Promise<SelectedOrder[]> {
  return findAllOrdersUseCase();
}
