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
  care: z.string().min(1, { message: 'Care is required' }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0€.' }),
  session_number: z.coerce
    .number()
    .gt(0, { message: 'Please enter a session number greater than 0.' }),
  status: z.enum(['active', 'inactive']),
});

const CreateCure = FormSchema.omit({ id: true });

export async function createCure(prevState: State, formData: FormData) {
  const validatedFields = CreateCure.safeParse({
    name: formData.get('name'),
    care: formData.get('care'),
    amount: formData.get('amount'),
    session_number: formData.get('session_number'),
    status: formData.get('status'),
  });

  console.log('validatedFields', validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Cure.',
    };
  }

  const { name, amount, status, care, session_number } = validatedFields.data;

  try {
    const cure_result = await sql`
      INSERT INTO cure_catalog (name, amount, status)
      VALUES (${name}, ${amount}, ${status})
      RETURNING *
      `;
    await sql`
      INSERT INTO cure_content (cure_id, care_id, session_number)
      VALUES (${cure_result.rows[0].id}, ${care}, ${session_number})
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Cure.',
    };
  }

  revalidatePath('/dashboard/cure');
  redirect('/dashboard/cure');
}

export async function deleteCure(id: string) {
  try {
    await sql`
      DELETE FROM cure_catalog
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete cure.');
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
    name: formData.get('name'),
    amount: formData.get('amount'),
    care: formData.get('care'),
    session_number: formData.get('session_number'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Cure.',
    };
  }

  const { name, amount, session_number, status, care } = validatedFields.data;

  try {
    await sql`
                UPDATE cure_catalog
                SET name = ${name},
                    amount = ${amount},
                    status = ${status}
                WHERE id = ${id}
            `;
    await sql`
      UPDATE cure_content
      SET care_id = ${care},
          session_number = ${session_number}
      WHERE cure_id = ${id}
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Cure.',
    };
  }

  revalidatePath('/dashboard/cure');
  redirect('/dashboard/cure');
}
