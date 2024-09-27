import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

const appointmentsRepository = new AppointmentsRepository();

export async function deleteAllAppointmentsWithThisType(
  appointmentTypeId: string,
) {
  const allAppointments = await appointmentsRepository.findAllAppointments();
  const appointmentsWithThisType = allAppointments.filter(
    (appointment) => appointment.appointment_type_id === appointmentTypeId,
  );
  const allPromises: Promise<void>[] = [];
  appointmentsWithThisType.forEach(async (appointment) => {
    allPromises.push(appointmentsRepository.deleteAppointment(appointment.id));
  });
  return Promise.all(allPromises);
}
