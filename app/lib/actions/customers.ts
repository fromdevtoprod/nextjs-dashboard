'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

export async function createCustomer(formData: FormData) {
  try {
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const gender = formData.get('gender')?.toString();
    const imageUrl =
      gender === 'female'
        ? '/customers/delba-de-oliveira.png'
        : '/customers/lee-robinson.png';
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
