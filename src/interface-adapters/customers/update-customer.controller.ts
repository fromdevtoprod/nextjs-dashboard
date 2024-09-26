import { UpdateCustomerPayload } from '@/src/application/repositories/customers.repository.interface';
import { updateCustomerUseCase } from '@/src/application/use-cases/customers/update-customer.use-case';
import { UpdatedCustomer } from '@/src/entities/models/customer';

export async function updateCustomerController(
  payload: UpdateCustomerPayload,
): Promise<UpdatedCustomer> {
  return updateCustomerUseCase(payload);
}
