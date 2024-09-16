import { deleteOrderUseCase } from '@/src/application/use-cases/orders/delete-order.use-case';

export async function deleteOrderController(id: string) {
  return deleteOrderUseCase(id);
}
