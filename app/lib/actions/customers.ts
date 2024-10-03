import { CreateClientResponse } from '@/pages/api/clients';
import {
  CreateCustomerPayload,
  UpdateCustomerPayload,
} from '@/src/application/repositories/customers.repository.interface';

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

export async function createClient(payload: CreateCustomerPayload) {
  const headers = getRequestHeaders('POST');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to add client');
  }
  return response.json() as Promise<CreateClientResponse>;
}

export async function updateClient(payload: UpdateCustomerPayload) {
  const headers = getRequestHeaders('PUT');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to update client');
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
