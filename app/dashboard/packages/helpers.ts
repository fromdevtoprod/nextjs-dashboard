import { CreatePackageResponse } from '@/pages/api/packages';
import { CreatedPackage } from '@/src/entities/models/package-model';

const URL = '/api/packages';

export async function getPostRequest(newPackage: CreatedPackage) {
  const headers = getRequestHeaders('POST');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(newPackage),
  });
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
