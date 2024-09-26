import { CreateClientResponse } from '@/pages/api/clients';
import {
  CreatedCustomer,
  UpdatedCustomer,
} from '@/src/entities/models/customer';

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

export function getDeleteRequest(id: string) {
  const headers = getRequestHeaders('DELETE');
  return fetch(URL, {
    ...headers,
    body: JSON.stringify({ id }),
  });
}

export async function getPostRequest(newClient: CreatedCustomer) {
  const headers = getRequestHeaders('POST');
  const result = await fetch(URL, {
    ...headers,
    body: JSON.stringify(newClient),
  });
  return result.json() as Promise<CreateClientResponse>;
}

export function getPutRequest(updatedClient: UpdatedCustomer) {
  const headers = getRequestHeaders('PUT');
  return fetch(URL, {
    ...headers,
    body: JSON.stringify(updatedClient),
  });
}

function getRequestHeaders(method: 'POST' | 'PUT' | 'DELETE') {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
