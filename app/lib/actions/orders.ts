'use server';

import { sql } from '@vercel/postgres';
import { getDatabaseError, getFieldErrors, validateAndRedirect } from './utils';
import { validatedOrderFields } from './schemas';
import {
  executeDeleteOrderRequest,
  executeInsertOrderRequest,
  executeUpdateOrderStatusRequest,
} from '../sql/order';
import { executeDeleteAppointmentByOrderRequest } from '../sql/appointment';

type State = {
  errors?: {
    name?: string[];
    amount?: string[];
    session_number?: string[];
  };
  message?: string | null;
};

export async function createOrder(prevState: State, formData: FormData) {
  const validatedFields = validatedOrderFields(formData);
  if (!validatedFields.success) return getFieldErrors(validatedFields.error);

  const { customer_id, product_id, payment_status } = validatedFields.data;

  try {
    await executeInsertOrderRequest({
      customerId: customer_id,
      productId: product_id,
      paymentStatus: payment_status,
    });
  } catch (error) {
    return getDatabaseError({ error, item: 'order', operation: 'insert' });
  }

  validateAndRedirect('orders');
}

export async function deleteOrder(orderId: string) {
  try {
    await executeDeleteAppointmentByOrderRequest(orderId);
    await executeDeleteOrderRequest(orderId);
  } catch (error) {
    return { message: `Database Error: Failed to delete this order.` };
  }

  validateAndRedirect('orders');
}

export async function updateOrder(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = validatedOrderFields(formData);
  if (!validatedFields.success) return getFieldErrors(validatedFields.error);

  const { customer_id, product_id, payment_status } = validatedFields.data;

  try {
    await sql`
      UPDATE orders SET
        customer_id = ${customer_id},
        product_id = ${product_id},
        payment_status = ${payment_status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return getDatabaseError({ error, item: 'order', operation: 'update' });
  }

  validateAndRedirect('orders');
}

export async function updateOrderStatus(orderId: string, status: string) {
  try {
    await executeUpdateOrderStatusRequest(orderId, status);
  } catch (error) {
    return {
      message: `Database Error: Failed to update this order.`,
    };
  }

  validateAndRedirect('orders');
}
