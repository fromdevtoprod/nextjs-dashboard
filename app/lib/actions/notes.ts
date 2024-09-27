const URL = '/api/notes';

export async function addNotes(payload: any) {
  const headers = getRequestHeaders('POST');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(payload),
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
