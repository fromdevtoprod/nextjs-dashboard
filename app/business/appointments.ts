import { fetchAppointmentNumberByCareId } from '../lib/data/appointments';
import { fetchCareById, fetchCareList } from '../lib/data/care';
import { fetchCureById } from '../lib/data/cure';
import { fetchPendingOrdersByCustomer } from '../lib/data/orders';
import { Care, PendingOrder } from '../lib/definitions';

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

export async function getAvailableCaresByCustomer(
  customerId: string,
): Promise<Care[]> {
  const pendingOrders = await fetchPendingOrdersByCustomer(customerId);
  const pendingCare = findPendingCare(pendingOrders);
  if (pendingCare) {
    return Promise.all([fetchCareById(pendingCare.product_id)]);
  }
  return fetchCareList();
}

export function calculateEndTime(startTime: string, duration: number) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHours.toString().padStart(2, '0')}:${endMinutes
    .toString()
    .padStart(2, '0')}`;
}

async function isCareAvailable(
  orderId: string,
  careId: string,
  careNumber: number,
) {
  const careCount = await fetchAppointmentNumberByCareId(orderId, careId);
  return careNumber > careCount;
}

function findPendingCare(pendingOrders: PendingOrder[]) {
  return pendingOrders.find((order) => order.product_type === 'care');
}
