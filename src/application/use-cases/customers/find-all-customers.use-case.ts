import { Customer } from '@/src/entities/models/customer';
import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';

export function findAllCustomersUseCase(): Promise<Customer[]> {
  return new CustomersRepository().findAll();
}
