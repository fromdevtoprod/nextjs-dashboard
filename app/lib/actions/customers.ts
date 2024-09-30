import { CreateClientResponse } from '@/pages/api/clients';
import {
  CreatedCustomer,
  UpdatedCustomer,
} from '@/src/entities/models/customer';

const URL = '/api/clients';

export async function deleteClient(id: string) {
  const headers = getRequestHeaders('DELETE');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete client');
  }
  return response.json();
}

export async function createClient(newClient: CreatedCustomer) {
  const headers = getRequestHeaders('POST');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(newClient),
  });
  if (!response.ok) {
    throw new Error('Failed to add client');
  }
  return response.json() as Promise<CreateClientResponse>;
}

export async function updateClient(updatedClient: UpdatedCustomer) {
  const headers = getRequestHeaders('PUT');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(updatedClient),
  });
  if (!response.ok) {
    throw new Error('Failed to add client');
  }
  return response.json();
}

function getRequestHeaders(method: 'POST' | 'PUT' | 'DELETE') {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
