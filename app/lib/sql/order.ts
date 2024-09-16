import { sql } from '@vercel/postgres';
import { PendingOrder } from '../definitions';

export async function executeSelectPendingOrderRequest(customerId: string) {
  return sql<PendingOrder>`
      SELECT orders.id, orders.product_id, products.type as product_type
      FROM orders
      LEFT JOIN products ON products.id = orders.product_id
      WHERE orders.customer_id=${customerId}
      AND orders.order_status='pending'
    `;
}

export async function executeInsertOrderRequest({
  customerId,
  paymentStatus,
  productId,
}: {
  customerId: string;
  paymentStatus: string;
  productId: string;
}) {
  return sql`
      INSERT INTO orders (customer_id, product_id, date, payment_status, order_status)
      VALUES (${customerId}, ${productId}, ${getDate()}, ${paymentStatus}, 'pending')
      RETURNING id
      `;
}

function getDate() {
  return new Date().toISOString().split('T')[0];
}
