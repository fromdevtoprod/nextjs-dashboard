import { CreateClientResponse } from '@/pages/api/clients';
import {
  CreatedCustomer,
  UpdatedCustomer,
} from '@/src/entities/models/customer';

const URL = '/api/clients';

export function deleteClient(id: string) {
  const headers = getRequestHeaders('DELETE');
  return fetch(URL, {
    ...headers,
    body: JSON.stringify({ id }),
  });
}

export async function createClient(newClient: CreatedCustomer) {
  const headers = getRequestHeaders('POST');
  const result = await fetch(URL, {
    ...headers,
    body: JSON.stringify(newClient),
  });
  return result.json() as Promise<CreateClientResponse>;
}

export function updateClient(updatedClient: UpdatedCustomer) {
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
