import { findAllAppointmentsByDateUseCase } from '@/src/application/use-cases/appointments/find-all-appointments-by-date.use-case';
import { findAllAppointmentsByCustomerIdUseCase } from '@/src/application/use-cases/appointments/find-all-appointments-by-customer.use-case';

export async function fetchAppointmentsByCustomer(customerId: string) {
  try {
    const appointments =
      await findAllAppointmentsByCustomerIdUseCase(customerId);
    return appointments;
  } catch (err) {
    console.error(
      'fetchAppointmentsByCustomer >> findAllAppointmentsByCustomerIdUseCase :',
      err,
    );
    throw new Error('Failed to fetch appointments for this customer.');
  }
}

export async function fetchAppointmentsByDate(
  day: number,
  month: number,
  year: number,
) {
  try {
    const appointments = await findAllAppointmentsByDateUseCase({
      day,
      month,
      year,
    });
    return appointments;
  } catch (error) {
    console.error(
      'fetchAppointmentsByDate >> findAllAppointmentsUseCase',
      error,
    );
    throw new Error('Failed to fetch appointments by date.');
  }
}
