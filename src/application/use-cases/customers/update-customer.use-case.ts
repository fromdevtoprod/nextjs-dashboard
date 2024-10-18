import { UpdateCustomerPayload } from '@/src/application/repositories/customers.repository.interface';
import { Customer } from '@/src/entities/models/customer';
import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';

export async function updateCustomerUseCase(
  payload: UpdateCustomerPayload,
): Promise<Customer> {
  return new CustomersRepository().updateCustomer(payload);
}
