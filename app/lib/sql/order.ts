import { sql } from '@vercel/postgres';

export async function getDeleteOrderRequest(orderId: string) {
  return sql`DELETE FROM orders WHERE id = ${orderId}`;
}
