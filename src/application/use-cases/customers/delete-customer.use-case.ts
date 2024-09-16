import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';

export async function deleteCustomerUseCase(id: string) {
  return new CustomersRepository().deleteCustomer(id);
}
