import { ProductType } from '../../repositories/orders.repository.interface';
import { findCureByIdUseCase } from '../cures/find-cure.use-case';
import { findOrderWithParametersUseCase } from '../orders/find-order-with-parameters.use-case';
import { findAllCaresByCustomerIdUseCase } from './find-all-cares-by-customer-id.use-case';
import { findAllCaresByCure } from './find-all-cares-by-cure.use-case';

export type FindAvailableCaresPayload = {
  customerId: string;
  productType: ProductType;
};

export async function findAvailableCaresUseCase({
  customerId,
  productType,
}: FindAvailableCaresPayload) {
  if (productType === 'care') {
    return {
      orderId: '',
      cares: await findAllCaresByCustomerIdUseCase(customerId),
    };
  }

  const pendingCureOrder = await findOrderWithParametersUseCase({
    customerId,
    status: 'pending',
    type: 'cure',
  });
  if (!pendingCureOrder) {
    return {
      orderId: '',
      cares: [],
    };
  }

  const cure = await findCureByIdUseCase(pendingCureOrder.product_id);
  return {
    orderId: pendingCureOrder.id,
    cares: await findAllCaresByCure({
      care_1_id: cure.getCare1Id(),
      care_1_session_number: cure.getCare1SessionNumber(),
      care_2_id: cure.getCare2Id(),
      care_2_session_number: cure.getCare2SessionNumber(),
      orderId: pendingCureOrder.id,
    }),
  };
}
