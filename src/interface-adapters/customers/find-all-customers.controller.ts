import { findAllCustomersUseCase } from '@/src/application/use-cases/customers/find-all-customers.use-case';
import { SelectedCustomer } from '@/src/entities/models/customer';

export async function findAllCustomersController(): Promise<
  SelectedCustomer[]
> {
  return findAllCustomersUseCase();
}
