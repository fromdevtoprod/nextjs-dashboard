import { UpdateNotesResponse } from '@/pages/api/notes';
import {
  AddNotesPayload,
  UpdateNotesPayload,
} from '@/src/application/repositories/notes.repository.interface';

const URL = '/api/notes';

export async function updateNotes(
  payload: UpdateNotesPayload,
): Promise<UpdateNotesResponse> {
  const headers = getRequestHeaders('PUT');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to update notes');
  }
  return response.json();
}

export async function addNotes(payload: AddNotesPayload) {
  const headers = getRequestHeaders('POST');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error('Failed to add notes');
  }
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
