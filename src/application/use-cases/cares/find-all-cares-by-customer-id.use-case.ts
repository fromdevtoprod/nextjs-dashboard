import { SelectedCare } from '@/src/entities/models/care';
import { findOrderWithParametersUseCase } from '../orders/find-order-with-parameters.use-case';
import { findAllCaresUseCase } from './find-all-cares.use-case';
import { findCareByIdUseCase } from './find-care.use-case';

export async function findAllCaresByCustomerIdUseCase(
  customerId: string,
): Promise<SelectedCare[]> {
  const pendingCareOrder = await findOrderWithParametersUseCase({
    customerId,
    status: 'pending',
    type: 'care',
  });
  if (pendingCareOrder) {
    return Promise.all([findCareByIdUseCase(pendingCareOrder.product_id)]);
  }
  return findAllCaresUseCase();
}
