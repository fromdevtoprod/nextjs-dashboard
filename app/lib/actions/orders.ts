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
    await sql`
      INSERT INTO orders (customer_id, product_id, date, payment_status, order_status)
      VALUES (${customer_id}, ${product_id}, ${getDate()}, ${payment_status}, 'pending')
      `;
  } catch (error) {
    return getDatabaseError({ error, item: 'order', operation: 'insert' });
  }

  validateAndRedirect('orders');
}

export async function deleteOrder(id: string) {
  try {
    await sql`DELETE FROM orders WHERE id = ${id}`;
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

function getDate() {
  return new Date().toISOString().split('T')[0];
}
