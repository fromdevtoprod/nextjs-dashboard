import {
  CreatedAppointmentType,
  SelectedAppointmentType,
} from '@/src/entities/models/appointment-types';

const URL = '/api/appointment-types';

export function getAppointmentTypePayload(
  formData: FormData,
): CreatedAppointmentType {
  const duration = parseInt(formData.get('duration') as string);
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);
  const sessionCount = parseInt(formData.get('sessionCount') as string);
  return {
    duration,
    name,
    price,
    session_count: sessionCount,
  };
}

export function getDeleteRequest(appointmentTypeId: string) {
  const headers = getRequestHeaders('DELETE');
  return fetch(URL, {
    ...headers,
    body: JSON.stringify({ id: appointmentTypeId }),
  });
}

export function getPostRequest(newAppointmentType: CreatedAppointmentType) {
  const headers = getRequestHeaders('POST');
  return fetch(URL, {
    ...headers,
    body: JSON.stringify(newAppointmentType),
  });
}

export function getPutRequest(updatedAppointmentType: SelectedAppointmentType) {
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
