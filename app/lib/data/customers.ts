import { Customer } from '@/src/entities/models/customer';
import { countNewCustomersUseCase } from '@/src/application/use-cases/customers/count-new-customers.use-case';
import { findAllCustomersUseCase } from '@/src/application/use-cases/customers/find-all-customers.use-case';

export async function fetchAllCustomers(
  userEmail: string,
): Promise<Customer[]> {
  try {
    const customers = await findAllCustomersUseCase(userEmail);
    return customers;
  } catch (error) {
    console.error('fetchAllCustomers >> findAllCustomersController', error);
    return [];
  }
}

export async function countNewCustomers(): Promise<number> {
  try {
    const newCustomersCount = await countNewCustomersUseCase();
    return newCustomersCount;
  } catch (error) {
    console.error('countNewCustomers >> countNewCustomersUseCase', error);
    return 0;
  }
}
