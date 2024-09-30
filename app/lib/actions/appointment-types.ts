import { CreateAppointmentTypeResponse } from '@/pages/api/appointment-types';
import {
  CreatedAppointmentType,
  SelectedAppointmentType,
} from '@/src/entities/models/appointment-types';

const URL = '/api/appointment-types';

export async function deleteAppointmentType(appointmentTypeId: string) {
  const headers = getRequestHeaders('DELETE');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify({ id: appointmentTypeId }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete appointment type');
  }
  return response.json() as Promise<void>;
}

export async function createAppointmentType(
  newAppointmentType: CreatedAppointmentType,
) {
  const headers = getRequestHeaders('POST');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(newAppointmentType),
  });
  if (!response.ok) {
    throw new Error('Failed to add appointment type');
  }
  return response.json() as Promise<CreateAppointmentTypeResponse>;
}

export async function updateAppointmentType(
  updatedAppointmentType: SelectedAppointmentType,
) {
  const headers = getRequestHeaders('PUT');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(updatedAppointmentType),
  });
  if (!response.ok) {
    throw new Error('Failed to update appointment type');
  }
  return response.json() as Promise<CreateAppointmentTypeResponse>;
}

function getRequestHeaders(method: 'POST' | 'PUT' | 'DELETE') {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
