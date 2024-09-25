import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';

const appointmentTypesRepository = new AppointmentTypesRepository();

export async function deleteAppointmentTypeUseCase(id: string) {
  return appointmentTypesRepository.delete(id);
}
