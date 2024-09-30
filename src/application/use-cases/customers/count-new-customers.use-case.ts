import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';

export function countNewCustomersUseCase(): Promise<number> {
  return new CustomersRepository().countNewCustomers();
}
