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
      message: 'Missing fields. Failed to Create Care.',
    };
  }

  try {
    const cure_result = await sql`
      INSERT INTO cure_catalog (name, amount, status)
      VALUES (${validatedFields.data.name}, ${validatedFields.data.amount}, ${validatedFields.data.session_number}, ${validatedFields.data.status})
      `;
    await sql`
      INSERT INTO cure_content (cure_id, care_id, session_number)
      VALUES (${cure_result.oid}, ${validatedFields.data.care}, ${validatedFields.data.session_number})
      `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Care.',
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
                UPDATE cure_catalog
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
