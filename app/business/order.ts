import { fetchPendingOrdersByCustomer } from '../lib/data/orders';
import { PendingOrder } from '../lib/definitions';
import { hasCareProductType } from './care';
import { hasCureProductType } from './cure';

export async function findPendingCareByCustomer(
  customerId: string,
): Promise<PendingOrder | undefined> {
  const pendingOrders = await fetchPendingOrdersByCustomer(customerId);
  return findPendingCare(pendingOrders);
}

export async function findPendingCureByCustomer(
  customerId: string,
): Promise<PendingOrder | undefined> {
  const pendingOrders = await fetchPendingOrdersByCustomer(customerId);
  return findPendingCure(pendingOrders);
}

function findPendingCare(pendingOrders: PendingOrder[]) {
  return pendingOrders.find((order) => hasCareProductType(order.product_type));
}

function findPendingCure(pendingOrders: PendingOrder[]) {
  return pendingOrders.find((order) => hasCureProductType(order.product_type));
}
