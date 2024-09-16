import { sql } from '@vercel/postgres';
import { Order } from '@/app/lib/definitions';
import { executeSelectPendingOrderRequest } from '../sql/order';
import { findAllOrdersController } from '@/src/interface-adapters/orders/find-all-orders.controller';

export async function fetchAllOrders() {
  try {
    const orders = await findAllOrdersController();
    return orders;
  } catch (error) {
    console.error('fetchAllOrders >> findAllOrdersController', error);
    throw new Error('Failed to fetch all orders.');
  }
}

export async function fetchOrderById(id: string) {
  try {
    const data = await sql<Order>`
      SELECT
        orders.id,
        orders.customer_id,
        orders.product_id,
        orders.payment_status,
        orders.order_status,
        products.type AS product_type
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

export async function fetchPendingOrdersByCustomer(customerId: string) {
  try {
    const pendingOrderResult =
      await executeSelectPendingOrderRequest(customerId);
    return pendingOrderResult.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch pending orders for this customer.');
  }
}
