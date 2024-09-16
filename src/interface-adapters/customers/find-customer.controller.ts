import { findCustomerByIdUseCase } from '@/src/application/use-cases/customers/find-customer.use-case';
import { SelectedCustomer } from '@/src/entities/models/customer';

export async function findCustomerByIdController(
  id: string,
): Promise<SelectedCustomer> {
  return findCustomerByIdUseCase(id);
}
