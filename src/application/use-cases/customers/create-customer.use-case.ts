import { CreateCustomerPayload } from '@/src/application/repositories/customers.repository.interface';
import { Customer } from '@/src/entities/models/customer';
import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';

export async function createCustomerUseCase(
  payload: CreateCustomerPayload,
): Promise<Customer> {
  return new CustomersRepository().createCustomer(payload);
}
