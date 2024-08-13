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
  name: z.string().min(1, { message: 'Name is required' }),
  category: z.string().min(1, { message: 'Category is required' }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0€.' }),
  duration: z.coerce
    .number()
    .gt(0, { message: 'Please enter a duration greater than 0.' }),
  status: z.enum(['active', 'inactive']),
});

const CreateCare = FormSchema.omit({ id: true });

export async function createCare(prevState: State, formData: FormData) {
  const validatedFields = CreateCare.safeParse({
    name: formData.get('name'),
    category: formData.get('category'),
    amount: formData.get('amount'),
    duration: formData.get('duration'),
    status: formData.get('status'),
  });

  console.log('validatedFields', validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Care.',
    };
  }

  try {
    await sql`
      INSERT INTO care (name, care_category_id, amount, duration, status)
      VALUES (${validatedFields.data.name}, ${validatedFields.data.category}, ${validatedFields.data.amount}, ${validatedFields.data.duration}, ${validatedFields.data.status})
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Care.',
    };
  }

  revalidatePath('/dashboard/care');
  redirect('/dashboard/care');
}

export async function deleteCare(id: string) {
  try {
    await sql`
      DELETE FROM care
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete care.');
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
    category: formData.get('category'),
    name: formData.get('name'),
    amount: formData.get('amount'),
    duration: formData.get('duration'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Care.',
    };
  }

  const { category, name, amount, duration, status } = validatedFields.data;

  try {
    await sql`
                UPDATE care
                SET care_category_id = ${category},
                    name = ${name},
                    amount = ${amount},
                    duration = ${duration},
                    status = ${status}
                WHERE id = ${id}
            `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Care.',
    };
  }

  revalidatePath('/dashboard/care');
  redirect('/dashboard/care');
}
