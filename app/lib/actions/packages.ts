import { CreatePackageResponse } from '@/pages/api/packages';
import { CreatedPackage } from '@/src/entities/models/package-model';

const URL = '/api/packages';

export async function startPackage(newPackage: CreatedPackage) {
  const headers = getRequestHeaders('POST');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(newPackage),
  });
  if (!response.ok) {
    throw new Error('Failed to start package');
  }
  return response.json() as Promise<CreatePackageResponse>;
}

function getRequestHeaders(method: 'POST' | 'PUT' | 'DELETE') {
  return {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
}
