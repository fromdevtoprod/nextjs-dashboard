import { CreatePaymentResponse } from '@/pages/api/payments';
import {
  CreatePaymentPayload,
  UpdatePaymentPayload,
} from '@/src/application/repositories/payments.repository.interface';

const URL = '/api/payments';

export async function deletePayment(id: string) {
  const headers = getRequestHeaders('DELETE');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete payment');
  }
  return response.json();
}

export async function createPayment(payload: CreatePaymentPayload) {
  const headers = getRequestHeaders('POST');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to add payment');
  }
  return response.json() as Promise<CreatePaymentResponse>;
}

export async function updatePayment(payload: UpdatePaymentPayload) {
  const headers = getRequestHeaders('PUT');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to update payment');
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
