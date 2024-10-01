import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { NotesRepository } from '@/src/infrastructure/repositories/notes.repository';
import { findAppointmentByIdUseCase } from './find-appointment.use-case';
import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';

export async function deleteAppointmentUseCase(
  appointmentId: string,
): Promise<void> {
  await new NotesRepository().delete(appointmentId);

  const appointment = await findAppointmentByIdUseCase(appointmentId);

  if (appointment.package_id) {
    const packageRepository = new PackagesRepository();
    const packageToUpdate = await packageRepository.findById(
      appointment.package_id,
    );
    packageToUpdate.remaining_sessions += 1;
    await packageRepository.updateRemainingSessions(packageToUpdate);
  }

  return new AppointmentsRepository().deleteAppointment(appointmentId);
}
