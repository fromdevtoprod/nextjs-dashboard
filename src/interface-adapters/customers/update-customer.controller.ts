import { updateCustomerUseCase } from '@/src/application/use-cases/customers/update-customer.use-case';
import { UpdatedCustomer } from '@/src/entities/models/customer';
import { formatBirthDate, parseCustomerForm } from './helpers';

export async function updateCustomerController(
  customerId: string,
  input: any,
): Promise<UpdatedCustomer> {
  const data = parseCustomerForm(input);
  return updateCustomerUseCase({
    id: customerId,
    name: data.name,
    email: data.email,
    phone: data.phone,
    birthDate: formatBirthDate(data.birth_date),
    pathology: data.pathology,
  });
}
