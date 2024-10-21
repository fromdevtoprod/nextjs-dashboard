import { CreateCustomerPayload } from '@/src/application/repositories/customers.repository.interface';
import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function createCustomerUseCase(
  payload: CreateCustomerPayload,
  userEmail: string,
) {
  const userId = await getUserIdUseCase(userEmail);
  return new CustomersRepository().createCustomer(payload, userId);
}
