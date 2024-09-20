import { SelectedOrder } from '@/src/entities/models/order';
import { OrdersRepository } from '@/src/infrastructure/repositories/orders.repository';
import { FindOrdersPayload } from '@/src/application/repositories/orders.repository.interface';

export function findOrderWithParametersUseCase(
  payload: FindOrdersPayload,
): Promise<SelectedOrder> {
  return new OrdersRepository().findOrderWithParameters(payload);
}
