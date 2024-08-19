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
  care_1: z.string().min(1, { message: 'One minimal care is required' }),
  session_number_1: z.coerce
    .number()
    .gt(0, { message: 'Please enter a session number greater than 0.' }),
  care_2: z.string().nullable(),
  session_number_2: z.coerce.number(),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0€.' }),
  status: z.enum(['active', 'inactive']),
});

const CreateCure = FormSchema.omit({ id: true });

export async function createCure(prevState: State, formData: FormData) {
  const validatedFields = CreateCure.safeParse({
    name: formData.get('name'),
    care_1: formData.get('care_1'),
    session_number_1: formData.get('session_number_1'),
    care_2: formData.get('care_2'),
    session_number_2: formData.get('session_number_2'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  console.log('validatedFields', validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Cure.',
    };
  }

  const {
    name,
    amount,
    status,
    care_1,
    session_number_1,
    care_2,
    session_number_2,
  } = validatedFields.data;

  try {
    await sql`
      INSERT INTO cure_catalog (name, amount, status, care_id_1, session_number_1, care_id_2, session_number_2)
      VALUES (${name}, ${amount}, ${status}, ${care_1}, ${session_number_1}, ${care_2}, ${session_number_2})
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
    care_1: formData.get('care_1'),
    session_number_1: formData.get('session_number_1'),
    care_2: formData.get('care_2'),
    session_number_2: formData.get('session_number_2'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Update Cure.',
    };
  }

  const {
    name,
    amount,
    status,
    care_1,
    session_number_1,
    care_2,
    session_number_2,
  } = validatedFields.data;

  try {
    await sql`
                UPDATE cure_catalog
                SET name = ${name},
                    amount = ${amount},
                    status = ${status},
                    care_id_1 = ${care_1},
                    session_number_1 = ${session_number_1},
                    care_id_2 = ${care_2},
                    session_number_2 = ${session_number_2}
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
