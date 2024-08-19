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
  id: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0€.' }),
  session_number: z.coerce
    .number()
    .gt(0, { message: 'Please enter a session number greater than 0.' }),
  status: z.enum(['active', 'inactive']),
});

const CreateCure = FormSchema.omit({ id: true });

export async function createOrder(prevState: State, formData: FormData) {
  const validatedFields = CreateCure.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
    session_number: formData.get('session_number'),
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
      INSERT INTO cure (name, amount, session_number, status)
      VALUES (${validatedFields.data.name}, ${validatedFields.data.amount}, ${validatedFields.data.session_number}, ${validatedFields.data.status})
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Care.',
    };
  }

  revalidatePath('/dashboard/cure');
  redirect('/dashboard/cure');
}

export async function deleteOrder(id: string) {
  try {
    await sql`
      DELETE FROM orders
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete order.');
  }

  revalidatePath('/dashboard/cure');
  redirect('/dashboard/cure');
}

export async function updateOrder(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateCure.safeParse({
    name: formData.get('name'),
    amount: formData.get('amount'),
    session_number: formData.get('session_number'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Care.',
    };
  }

  const { name, amount, session_number, status } = validatedFields.data;

  try {
    await sql`
                UPDATE cure
                SET name = ${name},
                    amount = ${amount},
                    session_number = ${session_number},
                    status = ${status}
                WHERE id = ${id}
            `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Cure.',
    };
  }

  revalidatePath('/dashboard/cure');
  redirect('/dashboard/cure');
}
