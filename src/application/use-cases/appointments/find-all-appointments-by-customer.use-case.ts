import { AppointmentsRepository } from '@/src/infrastructure/repositories/appointments.repository';

export function findAllAppointmentsByCustomerIdUseCase(customerId: string) {
  return new AppointmentsRepository().findAllAppointmentsByCustomerId(
    customerId,
  );
}
