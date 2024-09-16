import { findAllOrdersController } from '@/src/interface-adapters/orders/find-all-orders.controller';
import { findOrderByIdController } from '@/src/interface-adapters/orders/find-order.controller';
import { executeSelectPendingOrderRequest } from '../sql/order';

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
    const order = await findOrderByIdController(id);
    return order;
  } catch (error) {
    console.error('fetchOrderById >> findOrderByIdController', error);
    throw new Error('Failed to fetch this order.');
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
