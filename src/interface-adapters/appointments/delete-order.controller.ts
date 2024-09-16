import { deleteOrderUseCase } from '@/src/application/use-cases/orders/delete-order.use-case';

export async function deleteOrderController(id: string) {
  // TODO: delete appointments too
  return deleteOrderUseCase(id);
}
