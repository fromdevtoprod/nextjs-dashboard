import { Care } from '@/app/lib/definitions';
import { fetchCureById } from '@/app/lib/data/cure';
import { fetchAppointmentNumberByCareId } from '@/app/lib/data/appointments';
import { fetchCareById, fetchCareList } from '@/app/lib/data/care';

export async function getAvailableCaresInCure({
  orderId,
  productId,
}: {
  orderId: string;
  productId: string;
}): Promise<Care[]> {
  const cure = await fetchCureById(productId);
  let availableCares = [];
  const care1Count = await fetchAppointmentNumberByCareId(
    orderId,
    cure.care_1_id,
  );
  if (cure.care_1_session_number > care1Count) {
    availableCares.push(fetchCareById(cure.care_1_id));
  }
  if (!cure.care_2_id) {
    return Promise.all(availableCares);
  }
  const care2Count = await fetchAppointmentNumberByCareId(
    orderId,
    cure.care_2_id,
  );
  if (cure.care_2_session_number > care2Count) {
    availableCares.push(fetchCareById(cure.care_2_id));
  }
  return Promise.all(availableCares);
}

export async function getAvailableCares(): Promise<Care[]> {
  return fetchCareList();
}
