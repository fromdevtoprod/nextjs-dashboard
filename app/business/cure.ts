import { Care, ProductType } from '@/app/lib/definitions';
import { fetchCureById } from '../lib/data/cure';
import { isCareAvailable } from './care';
import { fetchCareById } from '../lib/data/care';

export async function getAvailableCaresInCure({
  orderId,
  productId,
}: {
  orderId: string;
  productId: string;
}): Promise<Care[]> {
  const cure = await fetchCureById(productId);
  let availableCares = [];

  const isCareOneAvailable = () =>
    isCareAvailable(orderId, cure.care_1_id, cure.care_1_session_number);

  const isCareTwoAvailable = () =>
    isCareAvailable(orderId, cure.care_2_id, cure.care_2_session_number);

  if (await isCareOneAvailable()) {
    availableCares.push(fetchCareById(cure.care_1_id));
  }

  if (cure.care_2_id && (await isCareTwoAvailable())) {
    availableCares.push(fetchCareById(cure.care_2_id));
  }

  return Promise.all(availableCares);
}

export function hasCureProductType(productType: ProductType) {
  return productType === 'cure';
}
