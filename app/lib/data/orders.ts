import { sql } from '@vercel/postgres';
import { Cure, Order } from '@/app/lib/definitions';

export async function fetchOrders() {
  try {
    const data = await sql<Order>`
      SELECT
        orders.id,
        orders.customer_id,
        orders.product_id,
        orders.product_type,
        orders.status,
        orders.date,
        customers.name as customer_name
      FROM orders
      LEFT JOIN customers ON orders.customer_id = customers.id
      ORDER BY orders.id DESC
    `;

    const orders = data.rows;

    for (const order of orders) {
      let result;
      if (order.product_type === 'cure') {
        result =
          await sql<Cure>`SELECT name FROM cure_catalog WHERE id = ${order.product_id}`;
      } else {
        result =
          await sql<Cure>`SELECT name FROM care_catalog WHERE id = ${order.product_id}`;
      }
      order.product_name = result.rows[0].name;
    }

    return orders;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch orders.');
  }
}

export async function fetchOrderById(id: string) {}
