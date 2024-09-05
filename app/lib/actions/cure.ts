'use server';

import { sql } from '@vercel/postgres';
import { getDatabaseError, getFieldErrors, validateAndRedirect } from './utils';
import { validatedCureFields } from './schemas';

type State = {
  errors?: {
    name?: string[];
    amount?: string[];
    session_number?: string[];
  };
  message?: string | null;
};

export async function createCure(prevState: State, formData: FormData) {
  const validatedFields = validatedCureFields(formData);
  if (!validatedFields.success) return getFieldErrors(validatedFields.error);

  const {
    product_name,
    product_amount,
    care_1_id,
    care_1_session_number,
    care_2_id,
    care_2_session_number,
  } = validatedFields.data;

  try {
    const product =
      await sql`INSERT INTO products (name, type, amount) VALUES (${product_name}, 'cure', ${product_amount}) RETURNING *`;
    await sql`
      INSERT INTO cure_content (product_id, care_1_id, care_1_session_number, care_2_id, care_2_session_number)
      VALUES (${product.rows[0].id}, ${care_1_id}, ${care_1_session_number}, ${care_2_id}, ${care_2_session_number})
      `;
  } catch (error) {
    return getDatabaseError({ error, item: 'cure', operation: 'insert' });
  }

  validateAndRedirect('cure');
}

export async function deleteCure(id: string) {
  try {
    await sql`DELETE FROM products WHERE id = ${id};`;
    await sql`DELETE FROM cure_content WHERE product_id = ${id};`;
  } catch (error) {
    return getDatabaseError({ error, item: 'cure', operation: 'delete' });
  }

  validateAndRedirect('cure');
}

export async function updateCure(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = validatedCureFields(formData);
  if (!validatedFields.success) return getFieldErrors(validatedFields.error);

  const {
    product_name,
    product_amount,
    care_1_id,
    care_1_session_number,
    care_2_id,
    care_2_session_number,
  } = validatedFields.data;

  try {
    await sql`UPDATE products SET name = ${product_name}, amount = ${product_amount} WHERE id = ${id}`;
    await sql`UPDATE cure_content SET
        care_1_id = ${care_1_id},
        care_1_session_number = ${care_1_session_number},
        care_2_id = ${care_2_id},
        care_2_session_number = ${care_2_session_number}
      WHERE product_id = ${id}
    `;
  } catch (error) {
    return getDatabaseError({ error, item: 'cure', operation: 'update' });
  }

  validateAndRedirect('cure');
}
