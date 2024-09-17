import { findAllOrdersController } from '@/src/interface-adapters/orders/find-all-orders.controller';
import {
  findOrderByIdController,
  findOrderWithParametersController,
} from '@/src/interface-adapters/orders/find-order.controller';
import { executeSelectPendingOrderRequest } from '../sql/order';
import { SelectedOrder } from '@/src/entities/models/order';
import { SelectedCare } from '@/src/entities/models/care';

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

export async function fetchPendingCureOrderByCustomer(
  customerId: string,
): Promise<SelectedOrder> {
  try {
    const pendingCureOrder = await findOrderWithParametersController({
      customerId,
      status: 'pending',
      type: 'cure',
    });
    return pendingCureOrder;
  } catch (error) {
    console.error(
      'fetchPendingCureByCustomer >> findOrderWithParametersController',
      error,
    );
    throw new Error('Failed to fetch pending cure for this customer.');
  }
}
