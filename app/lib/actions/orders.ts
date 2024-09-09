'use server';

import { sql } from '@vercel/postgres';
import { getDatabaseError, getFieldErrors, validateAndRedirect } from './utils';
import { validatedOrderFields } from './schemas';

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
    await getInsertOrderRequest({
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
    await sql`DELETE FROM orders WHERE id = ${orderId}`;
  } catch (error) {
    return getDatabaseError({ error, item: 'order', operation: 'delete' });
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
    await getUpdateOrderStatusRequest(orderId, status);
  } catch (error) {
    return getDatabaseError({
      error,
      item: 'order',
      operation: 'update',
    });
  }

  validateAndRedirect('orders');
}

export async function getUpdateOrderStatusRequest(
  orderId: string,
  status: string,
) {
  return sql`UPDATE orders SET order_status = ${status} WHERE id = ${orderId}`;
}

export async function getInsertOrderRequest({
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
