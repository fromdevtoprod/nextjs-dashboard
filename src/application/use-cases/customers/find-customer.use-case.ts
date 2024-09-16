import { SelectedCustomer } from '@/src/entities/models/customer';
import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';

export function findCustomerByIdUseCase(id: string): Promise<SelectedCustomer> {
  return new CustomersRepository().findCustomerById(id);
}
