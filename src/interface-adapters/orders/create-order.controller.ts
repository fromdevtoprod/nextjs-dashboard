import { createOrderUseCase } from '@/src/application/use-cases/orders/create-order.use-case';
import { CreatedOrder } from '@/src/entities/models/order';
import { parseOrderForm } from './helpers';

export async function createOrderController(input: any): Promise<CreatedOrder> {
  const data = parseOrderForm(input);
  return createOrderUseCase(data);
}
