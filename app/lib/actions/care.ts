'use server';

import { sql } from '@vercel/postgres';
import { getDatabaseError, getFieldErrors, validateAndRedirect } from './utils';
import { validatedCareFields } from './schemas';

type State = {
  errors?: {
    name?: string[];
    category?: string[];
    amount?: string[];
    duration?: string[];
  };
  message?: string | null;
};

export async function createCare(prevState: State, formData: FormData) {
  const validatedFields = validatedCareFields(formData);
  if (!validatedFields.success) return getFieldErrors(validatedFields.error);

  const { category_id, product_name, product_amount, duration } =
    validatedFields.data;

  try {
    const product =
      await sql`INSERT INTO products (name, type, amount) VALUES (${product_name}, 'care', ${product_amount}) RETURNING *`;
    await sql`INSERT INTO care_catalog (product_id, category_id, duration) VALUES (${product.rows[0].id}, ${category_id}, ${duration})`;
  } catch (error) {
    return getDatabaseError({ error, item: 'care', operation: 'insert' });
  }

  validateAndRedirect('care');
}

export async function deleteCare(id: string) {
  try {
    await sql`DELETE FROM products WHERE id=${id}`;
    await sql`DELETE FROM care_catalog WHERE product_id=${id}`;
  } catch (error) {
    return getDatabaseError({ error, item: 'care', operation: 'delete' });
  }

  validateAndRedirect('care');
}

export async function updateCare(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = validatedCareFields(formData);
  if (!validatedFields.success) return getFieldErrors(validatedFields.error);

  const { category_id, product_name, product_amount, duration } =
    validatedFields.data;

  try {
    await sql`UPDATE products SET name = ${product_name}, amount = ${product_amount} WHERE id = ${id}`;
    await sql`UPDATE care_catalog SET category_id = ${category_id}, duration = ${duration} WHERE product_id = ${id}`;
  } catch (error) {
    return getDatabaseError({ error, item: 'care', operation: 'update' });
  }

  validateAndRedirect('care');
}
