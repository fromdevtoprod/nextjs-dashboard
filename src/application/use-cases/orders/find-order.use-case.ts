import { OrderEntity, SelectedOrder } from '@/src/entities/models/order';
import { OrdersRepository } from '@/src/infrastructure/repositories/orders.repository';
import { FindOrdersPayload } from '@/src/application/repositories/orders.repository.interface';

export function findOrderByIdUseCase(id: string): Promise<OrderEntity> {
  return new OrdersRepository().findOrderById(id);
}

export function findOrderWithParametersUseCase(
  payload: FindOrdersPayload,
): Promise<SelectedOrder> {
  return new OrdersRepository().findOrderWithParameters(payload);
}
