import { SelectedCustomer } from '@/src/entities/models/customer';
import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';

export function findAllCustomersUseCase(): Promise<SelectedCustomer[]> {
  return new CustomersRepository().findAll();
}
