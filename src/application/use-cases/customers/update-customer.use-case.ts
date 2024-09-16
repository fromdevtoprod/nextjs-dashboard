import { UpdateCustomerPayload } from '@/src/application/repositories/customers.repository.interface';
import { UpdatedCustomer } from '@/src/entities/models/customer';
import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';

export async function updateCustomerUseCase(
  payload: UpdateCustomerPayload,
): Promise<UpdatedCustomer> {
  return new CustomersRepository().updateCustomer(payload);
}
