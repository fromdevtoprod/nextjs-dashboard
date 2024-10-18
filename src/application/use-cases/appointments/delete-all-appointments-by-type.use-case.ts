import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function deleteAllAppointmentsByTypeUseCase(
  appointmentTypeId: string,
) {
  return new AppointmentsRepository().deleteByAppointmentTypeId(
    appointmentTypeId,
  );
}
