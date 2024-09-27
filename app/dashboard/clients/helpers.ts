import { CreatedCustomer } from '@/src/entities/models/customer';

const URL = '/api/clients';

export function getClientPayload(formData: FormData): CreatedCustomer {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const birth_date = formData.get('birthDate') as string;
  const pathology = formData.get('pathology') as string;
  return {
    birth_date,
    email,
    name,
    pathology,
    phone,
  };
}
