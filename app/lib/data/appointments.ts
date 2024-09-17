import { sql } from '@vercel/postgres';
import { AppointmentShortDescription } from '@/app/lib/definitions';
import { findAppointmentsByDate } from '@/src/application/use-cases/appointments/find-appointment.use-case';

export async function fetchAppointmentsByCustomer(customerId: string) {
  try {
    const selectAppointmentsResult = await sql<AppointmentShortDescription>`
      SELECT
        appointments.date,
        appointments.id,
        appointments.order_id,
        products.name AS product_name,
        products.type AS product_type,
        orders.payment_status AS payment_status
      FROM appointments
      LEFT JOIN orders ON orders.id = appointments.order_id
      LEFT JOIN products ON products.id = appointments.care_id
      WHERE orders.customer_id = ${customerId}
    `;
    return selectAppointmentsResult.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch appointments for this customer.');
  }
}

export async function fetchAppointmentsByDate(
  day: number,
  month: number,
  year: number,
) {
  try {
    const appointments = await findAppointmentsByDate({ day, month, year });
    return appointments;
  } catch (error) {
    console.error(
      'fetchAppointmentsByDate >> findAllAppointmentsUseCase',
      error,
    );
    throw new Error('Failed to fetch appointments by date.');
  }
}
