import { CreatedOrder } from '@/src/entities/models/order';
import { createOrderUseCase } from '@/src/application/use-cases/orders/create-order.use-case';

export async function createOrderController(input: any): Promise<CreatedOrder> {
  return createOrderUseCase(input);
}
