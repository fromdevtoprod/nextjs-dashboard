import { sql } from '@vercel/postgres';

export async function getDeleteAppointmentByOrderIdRequest(orderId: string) {
  return sql`DELETE FROM appointments WHERE order_id = ${orderId}`;
}

export async function getDeleteAppointmentRequest(appointmentId: string) {
  return sql`DELETE FROM appointments WHERE id = ${appointmentId}`;
}

export async function getAppointmentCountByOrder(orderId: string) {
  const appointmentsCount =
    await sql`SELECT COUNT(*) FROM appointments WHERE order_id = ${orderId}`;
  return appointmentsCount.rows[0].count as number;
}
