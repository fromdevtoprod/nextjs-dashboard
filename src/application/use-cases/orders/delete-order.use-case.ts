import { OrdersRepository } from '@/src/infrastructure/repositories/orders.repository';

export async function deleteOrderUseCase(id: string): Promise<void> {
  return new OrdersRepository().deleteOrder(id);
}
