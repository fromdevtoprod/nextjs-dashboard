import {
  CreateAppointmentTypeResponse,
  UpdateAppointmentTypeResponse,
} from '@/pages/api/appointment-types';
import {
  CreatedAppointmentTypePayload,
  UpdateAppointmentTypePayload,
} from '@/src/application/repositories/appointment-types.repository.interface';

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
  newAppointmentType: CreatedAppointmentTypePayload,
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
  updatedAppointmentType: UpdateAppointmentTypePayload,
) {
  const headers = getRequestHeaders('PUT');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(updatedAppointmentType),
  });
  if (!response.ok) {
    throw new Error('Failed to update appointment type');
  }
  return response.json() as Promise<UpdateAppointmentTypeResponse>;
}

function getRequestHeaders(method: 'POST' | 'PUT' | 'DELETE') {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
