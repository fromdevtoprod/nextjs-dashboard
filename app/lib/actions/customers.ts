'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { z } from 'zod';

type State = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

const FormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().min(1, { message: 'Email is required' }),
  gender: z.enum(['male', 'female']),
});

const CreateCustomer = FormSchema.omit({ id: true });

export async function createCustomer(prevState: State, formData: FormData) {
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    gender: formData.get('gender'),
  });

  console.log('validatedFields', validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to Create Customer.',
    };
  }

  const { name, email, gender } = validatedFields.data;
  const imageUrl =
    gender === 'female'
      ? '/customers/delba-de-oliveira.png'
      : '/customers/lee-robinson.png';

  try {
    await sql`INSERT INTO customers (name, email, image_url) VALUES (${name}, ${email}, ${imageUrl})`;
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create Customer.',
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  try {
    sql`DELETE FROM customers WHERE id = ${id}`;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Customer.',
    };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}
