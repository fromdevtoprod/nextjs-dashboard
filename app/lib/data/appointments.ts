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

export async function fetchAppointmentNumberByCareId(
  orderId: string,
  careId: string,
) {
  try {
    const data = await sql`
      SELECT COUNT(*) FROM appointments
      WHERE order_id = ${orderId}
      AND care_id = ${careId}
    `;
    return data.rows[0].count as number;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch appointments number by care.');
  }
}

function convertToTwoDigit(number: number) {
  return number < 10 ? `0${number}` : number;
}
