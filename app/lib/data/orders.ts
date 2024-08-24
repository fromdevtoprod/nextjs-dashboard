import { sql } from '@vercel/postgres';
import { Order } from '@/app/lib/definitions';

export async function fetchOrders() {
  try {
    const data = await sql<Order>`
      SELECT
        orders.id,
        orders.customer_id,
        orders.product_id,
        orders.date,
        orders.status,
        customers.name as customer_name,
        products.name as product_name,
        products.type as product_type
      FROM orders
      LEFT JOIN customers ON orders.customer_id = customers.id
      LEFT JOIN products ON orders.product_id = products.id
      ORDER BY orders.date DESC
    `;
    const orders = data.rows;
    return orders;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch orders.');
  }
}

export async function fetchOrderById(id: string) {
  try {
    const data = await sql<Order>`
      SELECT
        orders.id,
        orders.customer_id,
        orders.product_id,
        orders.status
      FROM orders
      LEFT JOIN customers ON orders.customer_id = customers.id
      LEFT JOIN products ON orders.product_id = products.id
      WHERE orders.id = ${id}
    `;

    const order = data.rows[0];
    return order;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch order.');
  }
}

export async function fetchOrdersByCustomer(customerId: string) {
  try {
    const data = await sql<Order>`
      SELECT
        orders.id,
        orders.customer_id,
        orders.product_id,
        orders.status,
        orders.date,
        products.name AS product_name,
        products.type AS product_type
      FROM orders
      LEFT JOIN products ON orders.product_id = products.id
      WHERE orders.customer_id = ${customerId}
      ORDER BY orders.id DESC
    `;
    const orders = data.rows;
    return orders;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch orders for this customer.');
  }
}
