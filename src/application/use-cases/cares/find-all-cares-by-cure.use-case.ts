import { SelectedCare } from '@/src/entities/models/care';
import { countAppointmentsByCareIdUseCase } from '../appointments/count-appointment.use-case';
import { findCareByIdUseCase } from './find-care.use-case';

type FindAllCaresByCurePayload = {
  care_1_id: string;
  care_1_session_number: number;
  care_2_id: string | null;
  care_2_session_number: number;
  orderId: string;
};

export async function findAllCaresByCure({
  care_1_id,
  care_1_session_number,
  care_2_id,
  care_2_session_number,
  orderId,
}: FindAllCaresByCurePayload): Promise<SelectedCare[]> {
  let availableCares: Promise<SelectedCare>[] = [];

  const care1AppointmentsCount = await countAppointmentsByCareIdUseCase({
    careId: care_1_id,
    orderId,
  });
  if (care_1_session_number > care1AppointmentsCount) {
    availableCares.push(findCareByIdUseCase(care_1_id));
  }

  if (care_2_id) {
    const care2AppointmentsCount = await countAppointmentsByCareIdUseCase({
      careId: care_2_id,
      orderId,
    });
    if (care_2_session_number > care2AppointmentsCount) {
      availableCares.push(findCareByIdUseCase(care_2_id));
    }
  }

  return Promise.all(availableCares);
}
