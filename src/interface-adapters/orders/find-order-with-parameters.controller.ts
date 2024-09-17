import { FindOrdersPayload } from '@/src/application/repositories/orders.repository.interface';
import { findOrderWithParametersUseCase } from '@/src/application/use-cases/orders/find-order.use-case';
import { SelectedOrder } from '@/src/entities/models/order';

export function findOrderWithParametersController(
  parameters: FindOrdersPayload,
): Promise<SelectedOrder> {
  return findOrderWithParametersUseCase(parameters);
}
