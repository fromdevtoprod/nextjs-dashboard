import { updateOrderUseCase } from '@/src/application/use-cases/orders/update-order.use-case';
import { UpdatedOrder } from '@/src/entities/models/order';

export async function updateOrderController(
  id: string,
  input: any,
): Promise<UpdatedOrder> {
  return updateOrderUseCase({
    id,
    ...input,
  });
}
