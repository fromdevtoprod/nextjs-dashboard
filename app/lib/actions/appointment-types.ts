import { CreateAppointmentTypeResponse } from '@/pages/api/appointment-types';
import {
  CreatedAppointmentType,
  SelectedAppointmentType,
} from '@/src/entities/models/appointment-types';

const URL = '/api/appointment-types';

export function deleteAppointmentType(appointmentTypeId: string) {
  const headers = getRequestHeaders('DELETE');
  return fetch(URL, {
    ...headers,
    body: JSON.stringify({ id: appointmentTypeId }),
  });
}

export async function createAppointmentType(
  newAppointmentType: CreatedAppointmentType,
) {
  const headers = getRequestHeaders('POST');
  const result = await fetch(URL, {
    ...headers,
    body: JSON.stringify(newAppointmentType),
  });
  return result.json() as Promise<CreateAppointmentTypeResponse>;
}

export function updateAppointmentType(
  updatedAppointmentType: SelectedAppointmentType,
) {
  const headers = getRequestHeaders('PUT');
  return fetch(URL, {
    ...headers,
    body: JSON.stringify(updatedAppointmentType),
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
