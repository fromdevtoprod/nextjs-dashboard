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

function getRequestHeaders(method: 'POST' | 'PUT' | 'DELETE') {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
