import { fetchAppointmentNumberByCareId } from '../lib/data/appointments';
import { fetchCareById, fetchCareList } from '../lib/data/care';
import { fetchCureById } from '../lib/data/cure';
import { Care } from '../lib/definitions';

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

// This function should calculate the end time of the appointment based on the
// selected care and the start time of the appointment. The duration of the care
// should be added to the start time to get the end time. The start time is
// passed as a string in the format "HH:MM" and the duration of the care is
// stored in the care object as an integer. The end time should be returned as a
// string in the format "HH:MM".
export function calculateEndTime(startTime: string, duration: number) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;
  return `${endHours.toString().padStart(2, '0')}:${endMinutes
    .toString()
    .padStart(2, '0')}`;
}
