import { CreatedPackageResponse } from '@/pages/api/packages';
import {
  CreatedPackage,
  SelectedPackage,
} from '@/src/entities/models/package-model';

const URL = '/api/packages';

export function getDeleteRequest(packageId: string) {
  const headers = getRequestHeaders('DELETE');
  return fetch(URL, {
    ...headers,
    body: JSON.stringify({ id: packageId }),
  });
}

export async function getPostRequest(newPackage: CreatedPackage) {
  const headers = getRequestHeaders('POST');
  const response = await fetch(URL, {
    ...headers,
    body: JSON.stringify(newPackage),
  });
  return response.json() as Promise<CreatedPackageResponse>;
}

export function getPutRequest(updatedPackage: SelectedPackage) {
  const headers = getRequestHeaders('PUT');
  return fetch(URL, {
    ...headers,
    body: JSON.stringify(updatedPackage),
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
