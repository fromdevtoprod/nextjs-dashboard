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
        customers.name AS customer_name,
        appointments.date,
        appointments.end_date,
        appointments.id,
        appointments.order_id,
        products.name AS product_name,
        products.type AS product_type
      FROM appointments
      LEFT JOIN orders ON orders.id = appointments.order_id
      LEFT JOIN products ON products.id = orders.product_id
      LEFT JOIN customers ON customers.id = orders.customer_id
      WHERE EXTRACT(DAY FROM appointments.date) = ${convertToTwoDigit(day)}
      AND EXTRACT(MONTH FROM appointments.date) = ${convertToTwoDigit(month)}
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
