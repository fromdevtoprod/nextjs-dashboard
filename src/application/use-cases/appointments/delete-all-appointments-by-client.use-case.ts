import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

const appointmentsRepository = new AppointmentsRepository();

export async function deleteAllAppointmentsByClientUseCase(customerId: string) {
  const allAppointments = await appointmentsRepository.findAllAppointments();
  const appointmentsWithThisType = allAppointments.filter(
    (appointment) => appointment.customer_id === customerId,
  );
  const allPromises: Promise<void>[] = [];
  appointmentsWithThisType.forEach(async (appointment) => {
    allPromises.push(appointmentsRepository.deleteAppointment(appointment.id));
  });
  return Promise.all(allPromises);
}
