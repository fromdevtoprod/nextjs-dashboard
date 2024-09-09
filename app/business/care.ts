import { Care, ProductType } from '@/app/lib/definitions';
import { fetchCareById, fetchCareList } from '../lib/data/care';
import { fetchAppointmentNumberByCareId } from '../lib/data/appointments';
import { findPendingCareByCustomer } from './order';

export async function isCareAvailable(
  orderId: string,
  careId: string,
  careNumber: number,
) {
  const careCount = await fetchAppointmentNumberByCareId(orderId, careId);
  return careNumber > careCount;
}

export async function getAvailableCaresByCustomer(
  customerId: string,
): Promise<Care[]> {
  const pendingCare = await findPendingCareByCustomer(customerId);
  if (pendingCare) {
    return Promise.all([fetchCareById(pendingCare.product_id)]);
  }
  return fetchCareList();
}

export function hasCareProductType(productType: ProductType) {
  return productType === 'care';
}
