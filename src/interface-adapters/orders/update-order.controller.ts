import { updateOrderUseCase } from '@/src/application/use-cases/orders/update-order.use-case';
import { UpdatedOrder } from '@/src/entities/models/order';
import { parseOrderForm } from './helpers';

export async function updateOrderController(
  id: string,
  input: any,
): Promise<UpdatedOrder> {
  const data = parseOrderForm(input);
  return updateOrderUseCase({
    id,
    ...data,
  });
}
