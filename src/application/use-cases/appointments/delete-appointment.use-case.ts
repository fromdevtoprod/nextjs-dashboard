import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';
import { updateOrderStatusUseCase } from '../orders/update-order-status.use-case';

export type DeleteAppointmentUseCasePayload = {
  appointmentId: string;
  orderId: string;
};

export async function deleteAppointmentUseCase({
  appointmentId,
  orderId,
}: DeleteAppointmentUseCasePayload): Promise<void> {
  await new AppointmentsRepository().deleteAppointment(appointmentId);
  await updateOrderStatusUseCase({ orderId, orderStatus: 'pending' });
}
