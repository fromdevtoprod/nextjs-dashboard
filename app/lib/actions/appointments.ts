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
  order_id: z.string().min(1, { message: 'An order is required' }),
  product_name: z.string().min(1, { message: 'The product name is required' }),
  customer_name: z
    .string()
    .min(1, { message: 'The customer name is required' }),
  status: z.enum(['pending', 'done']),
  date: z.string(),
  ended_time: z.string(),
});

const CreateOrder = FormSchema.omit({ id: true });

export async function createAppointment(prevState: State, formData: FormData) {
  const validatedFields = CreateOrder.safeParse({
    order_id: formData.get('order-id'),
    product_name: formData.get('product-name'),
    customer_name: formData.get('customer-name'),
    status: formData.get('status') || 'pending',
    date: formData.get('date'),
    ended_time: formData.get('ended-time'),
  });

  console.log('validatedFields', validatedFields);

  if (!validatedFields.success) {
    console.log(
      'validatedFields.error.flatten()',
      validatedFields.error.flatten(),
    );
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to add this appointment.',
    };
  }

  const { order_id, product_name, customer_name, status, date, ended_time } =
    validatedFields.data;

  try {
    await sql`
      INSERT INTO appointments (order_id, product_name, customer_name, status, date, ended_time)
      VALUES (${order_id}, ${product_name}, ${customer_name}, ${status}, ${date}, ${ended_time})
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to add this appointment.',
    };
  }

  revalidatePath('/dashboard/appointments');
  redirect('/dashboard/appointments');
}
