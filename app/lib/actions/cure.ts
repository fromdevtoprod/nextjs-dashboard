'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { z } from 'zod';

type State = {
  errors?: {
    name?: string[];
    amount?: string[];
    session_number?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  product_id: z.string(),
  product_name: z.string().min(1, { message: 'Name is required' }),
  care_1_id: z.string().min(1, { message: 'One minimal care is required' }),
  care_1_session_number: z.coerce
    .number()
    .gt(0, { message: 'Please enter a session number greater than 0.' }),
  care_2_id: z.string().nullable(),
  care_2_session_number: z.coerce.number(),
  product_amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0.' }),
});

const CreateCure = FormSchema.omit({ product_id: true });

export async function createCure(prevState: State, formData: FormData) {
  const validatedFields = CreateCure.safeParse({
    product_name: formData.get('name'),
    care_1_id: formData.get('care_1'),
    care_1_session_number: formData.get('session_number_1'),
    care_2_id: formData.get('care_2'),
    care_2_session_number: formData.get('session_number_2'),
    product_amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create this cure.',
    };
  }

  const {
    product_name,
    product_amount,
    care_1_id,
    care_1_session_number,
    care_2_id,
    care_2_session_number,
  } = validatedFields.data;

  try {
    const product = await sql`
      INSERT INTO products (name, type, amount)
      VALUES (${product_name}, 'cure', ${product_amount})
      RETURNING *
    `;

    await sql`
      INSERT INTO cure_content (product_id, care_1_id, care_1_session_number, care_2_id, care_2_session_number)
      VALUES (${product.rows[0].id}, ${care_1_id}, ${care_1_session_number}, ${care_2_id}, ${care_2_session_number})
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to create this cure.',
    };
  }

  revalidatePath('/dashboard/cure');
  redirect('/dashboard/cure');
}

export async function deleteCure(id: string) {
  try {
    await sql`DELETE FROM products WHERE id = ${id};`;
    await sql`DELETE FROM cure_content WHERE product_id = ${id};`;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete this cure.');
  }

  revalidatePath('/dashboard/cure');
  redirect('/dashboard/cure');
}

export async function updateCure(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateCure.safeParse({
    product_name: formData.get('name'),
    care_1_id: formData.get('care_1'),
    care_1_session_number: formData.get('session_number_1'),
    care_2_id: formData.get('care_2'),
    care_2_session_number: formData.get('session_number_2'),
    product_amount: formData.get('amount'),
  });
  console.log(
    'validatedFields.error?.flatten().fieldErrors',
    validatedFields.error?.flatten().fieldErrors,
  );
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to update this cure.',
    };
  }
  const {
    product_name,
    product_amount,
    care_1_id,
    care_1_session_number,
    care_2_id,
    care_2_session_number,
  } = validatedFields.data;
  try {
    await sql`
      UPDATE products
      SET
        name = ${product_name},
        amount = ${product_amount}
      WHERE id = ${id}
    `;
    await sql`
      UPDATE cure_content
      SET
        care_1_id = ${care_1_id},
        care_1_session_number = ${care_1_session_number},
        care_2_id = ${care_2_id},
        care_2_session_number = ${care_2_session_number}
      WHERE product_id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to update this cure.',
    };
  }
  revalidatePath('/dashboard/cure');
  redirect('/dashboard/cure');
}
