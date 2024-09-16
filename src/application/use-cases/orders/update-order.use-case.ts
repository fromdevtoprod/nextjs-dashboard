import { UpdateOrderPayload } from '@/src/application/repositories/orders.repository.interface';
import { CreatedOrder } from '@/src/entities/models/order';
import { OrdersRepository } from '@/src/infrastructure/repositories/orders.repository';

export async function updateOrderUseCase(
  payload: UpdateOrderPayload,
): Promise<CreatedOrder> {
  return new OrdersRepository().updateOrder(payload);
}
