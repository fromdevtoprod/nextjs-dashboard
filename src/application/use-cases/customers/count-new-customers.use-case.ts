import { CustomersRepository } from '@/src/infrastructure/repositories/customers.repository';
import { getUserIdUseCase } from '../users/get-user-id.use-case';

export async function countNewCustomersUseCase(userEmail: string) {
  const userId = await getUserIdUseCase(userEmail);
  if (!userId) {
    throw new Error('User not found');
  }
  return new CustomersRepository().countNewCustomers(userId);
}
