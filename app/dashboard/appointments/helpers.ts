import { CreateAppointmentResponse } from '@/pages/api/appointments';
import { CreateAppointmentPayload } from '@/src/application/repositories/appointments.repository.interface';

const URL = '/api/appointments';

export async function getPostRequest(newAppointment: CreateAppointmentPayload) {
  const headers = getRequestHeaders('POST');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(newAppointment),
  });
  return response.json() as Promise<CreateAppointmentResponse>;
}

export async function getDeleteRequest(id: string) {
  const headers = getRequestHeaders('DELETE');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify({ id }),
  });
  return response.json() as Promise<void>;
}

function getRequestHeaders(method: 'POST' | 'PUT' | 'DELETE') {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
