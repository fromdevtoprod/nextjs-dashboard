'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { z } from 'zod';

type State = {
  errors?: {
    name?: string[];
    category?: string[];
    amount?: string[];
    duration?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  category_id: z.string().min(1, { message: 'Category is required' }),
  duration: z.coerce
    .number()
    .gt(0, { message: 'Please enter a duration greater than 0.' }),
  product_amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0€.' }),
  product_name: z.string().min(1, { message: 'Name is required' }),
});

const CreateCare = FormSchema.omit({ id: true });

export async function createCare(prevState: State, formData: FormData) {
  const validatedFields = CreateCare.safeParse({
    category_id: formData.get('category'),
    duration: formData.get('duration'),
    product_amount: formData.get('amount'),
    product_name: formData.get('name'),
  });

  console.log('validatedFields', validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to create this care.',
    };
  }

  try {
    const product = await sql`
      INSERT INTO products (name, type, amount)
      VALUES (${validatedFields.data.product_name}, 'care', ${validatedFields.data.product_amount})
      RETURNING *
    `;
    await sql`
      INSERT INTO care_catalog (product_id, category_id, duration)
      VALUES (${product.rows[0].id}, ${validatedFields.data.category_id}, ${validatedFields.data.duration})
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to create this care.',
    };
  }

  revalidatePath('/dashboard/care');
  redirect('/dashboard/care');
}

export async function deleteCare(id: string) {
  try {
    await sql`
      DELETE FROM care_catalog
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete this care.');
  }

  revalidatePath('/dashboard/care');
  redirect('/dashboard/care');
}

export async function updateCare(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateCare.safeParse({
    category_id: formData.get('category'),
    duration: formData.get('duration'),
    product_name: formData.get('name'),
    product_amount: formData.get('amount'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to update this care.',
    };
  }

  const { category_id, product_name, product_amount, duration } =
    validatedFields.data;

  try {
    await sql`
      UPDATE products
      SET name = ${product_name}, amount = ${product_amount}
      WHERE id = ${id}
    `;
    await sql`
      UPDATE care_catalog
      SET category_id = ${category_id}, duration = ${duration}
      WHERE product_id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to update this care.',
    };
  }

  revalidatePath('/dashboard/care');
  redirect('/dashboard/care');
}
