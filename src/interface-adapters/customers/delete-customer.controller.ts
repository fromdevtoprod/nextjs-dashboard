import { deleteCustomerUseCase } from '@/src/application/use-cases/customers/delete-customer.use-case';

export async function deleteCustomerController(id: string) {
  return deleteCustomerUseCase(id);
}
