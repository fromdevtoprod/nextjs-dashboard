import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { findAppointmentByIdUseCase } from './find-appointment.use-case';
import { PackagesRepository } from '@/src/infrastructure/repositories/packages.repository';
import { deleteNotesUseCase } from '../notes/delete-notes.use-case';
import { deletePaymentByAppointmentUseCase } from '../payments/delete-payment-by-appointment.use-case';

export async function deleteAppointmentUseCase(
  appointmentId: string,
): Promise<void> {
  await deleteNotesUseCase(appointmentId);
  await deletePaymentByAppointmentUseCase(appointmentId);

  const appointment = await findAppointmentByIdUseCase(appointmentId);

  if (appointment?.packageId) {
    // TODO: move this to a dedicated use-case
    const packageRepository = new PackagesRepository();
    const packageToUpdate = await packageRepository.findById(
      appointment.packageId,
    );
    if (!packageToUpdate) {
      throw new Error('Package not found');
    }
    packageToUpdate.remaining_sessions += 1;
    await packageRepository.updateRemainingSessions(packageToUpdate);
  }

  return new AppointmentsRepository().deleteAppointment(appointmentId);
}
