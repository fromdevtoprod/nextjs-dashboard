import { PaymentsRepository } from '@/src/infrastructure/repositories/payments.repository';

export async function deletePaymentByAppointmentUseCase(
  appointmentId: string,
): Promise<void> {
  return new PaymentsRepository().deletePaymentByAppointmentId(appointmentId);
}
