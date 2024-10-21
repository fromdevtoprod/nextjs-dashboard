import { CreateCustomerPayload } from '@/src/application/repositories/customers.repository.interface';
import { Customer } from '@/src/entities/models/customer';
import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function createCustomerUseCase(
  payload: CreateCustomerPayload,
  userEmail: string,
): Promise<Customer> {
  const userId = await getUserIdUseCase(userEmail);
  if (!userId) {
    throw new Error('User not found');
  }
  return new CustomersRepository().createCustomer(payload, userId);
}
