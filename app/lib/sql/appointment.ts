import { sql } from '@vercel/postgres';

export async function executeDeleteAppointmentRequest(appointmentId: string) {
  return sql`DELETE FROM appointments WHERE id = ${appointmentId}`;
}

export async function executeCountAppointmentRequest(orderId: string) {
  const appointmentsCount =
    await sql`SELECT COUNT(*) FROM appointments WHERE order_id = ${orderId}`;
  return appointmentsCount.rows[0].count as number;
}
