import { sql } from '@vercel/postgres';
import {
  Appointment,
  AppointmentShortDescription,
} from '@/app/lib/definitions';

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

export async function fetchAppointments(
  day: number,
  month: number,
  year: number,
) {
  try {
    const selectAppointmentsResult = await sql<Appointment>`
      SELECT
        appointments.care_id,
        customers.name AS customer_name,
        customers.id AS customer_id,
        appointments.date,
        appointments.end_date,
        appointments.id,
        appointments.order_id,
        products.name AS product_name,
        products.type AS product_type,
        orders.payment_status AS payment_status
      FROM appointments
      LEFT JOIN orders ON orders.id = appointments.order_id
      LEFT JOIN products ON products.id = appointments.care_id
      LEFT JOIN customers ON customers.id = orders.customer_id
      WHERE EXTRACT(DAY FROM appointments.date) = ${convertToTwoDigit(day)}
      AND EXTRACT(MONTH FROM appointments.date) = ${convertToTwoDigit(month)}
      AND EXTRACT(YEAR FROM appointments.date) = ${year}
    `;
    return selectAppointmentsResult.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch appointments.');
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
