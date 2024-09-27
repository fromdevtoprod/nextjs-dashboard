import { AppointmentTypesRepository } from '@/src/infrastructure/repositories/appointment-types.repository';
import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export async function deleteAppointmentTypeUseCase(id: string) {
  const allAppointments =
    await new AppointmentsRepository().findAllAppointments();
  const appointmentsWithThisType = allAppointments.filter(
    (appointment) => appointment.appointment_type_id === id,
  );
  appointmentsWithThisType.forEach(async (appointment) => {
    await new AppointmentsRepository().deleteAppointment(appointment.id);
  });
  return new AppointmentTypesRepository().delete(id);
}
