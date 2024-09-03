import { sql } from '@vercel/postgres';
import { Appointment } from '@/app/lib/definitions';

export async function fetchAppointments(
  day: number,
  month: number,
  year: number,
) {
  try {
    const data = await sql<Appointment>`
      SELECT
        appointments.id,
        appointments.order_id,
        appointments.date,
        appointments.end_date,
        orders.customer_id,
        products.name AS product_name,
        customers.name AS customer_name
      FROM appointments
      LEFT JOIN orders ON orders.id = appointments.order_id
      LEFT JOIN products ON products.id = orders.product_id
      LEFT JOIN customers ON customers.id = orders.customer_id
      WHERE EXTRACT(DAY FROM appointments.date) = ${convertToTwoDigit(day)}
      AND EXTRACT(MONTH FROM appointments.date) = ${convertToTwoDigit(convertJavascriptMonthToMonthNumber(month))}
      AND EXTRACT(YEAR FROM appointments.date) = ${year}
    `;
    const appointments = data.rows;
    return appointments;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch orders.');
  }
}

function convertToTwoDigit(number: number) {
  return number < 10 ? `0${number}` : number;
}

function convertJavascriptMonthToMonthNumber(month: number) {
  return month + 1;
}
