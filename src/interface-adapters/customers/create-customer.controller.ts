import { CreatedCustomer } from '@/src/entities/models/customer';
import { createCustomerUseCase } from '@/src/application/use-cases/customers/create-customer.use-case';
import { formatBirthDate, parseCustomerForm } from './helpers';

export async function createCustomerController(
  input: any,
): Promise<CreatedCustomer> {
  const data = parseCustomerForm(input);
  return createCustomerUseCase({
    name: data.name,
    email: data.email,
    phone: data.phone,
    birthDate: formatBirthDate(data.birth_date),
    pathology: data.pathology,
  });
}
