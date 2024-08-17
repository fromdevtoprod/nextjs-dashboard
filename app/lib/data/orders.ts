import { sql } from '@vercel/postgres';
import { Order } from '@/app/lib/definitions';

export async function fetchOrders() {
  try {
    const data = await sql<Order>`
      SELECT
        orders.id,
        orders.customer_id,
        orders.product_id,
        orders.product_type,
        orders.session_number,
        customers.name as customer_name
      FROM orders
      LEFT JOIN customers ON orders.customer_id = customers.id
      ORDER BY orders.id DESC
      LIMIT 5
    `;

    const orders = data.rows;
    return orders;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch orders.');
  }
}

export async function fetchOrderById(id: string) {}
