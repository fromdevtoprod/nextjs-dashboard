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
  customer_id: z.string().min(1, { message: 'The customer is required' }),
  product_id: z.string().min(1, { message: 'The product is required' }),
  product_name: z.string().min(1, { message: 'The product name is required' }),
  product_type: z.string().min(1, { message: 'The product type is required' }),
  payment_status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateOrder = FormSchema.omit({ id: true, date: true });

export async function createOrder(prevState: State, formData: FormData) {
  const validatedFields = CreateOrder.safeParse({
    customer_id: formData.get('customer'),
    product_id: formData.get('product-id'),
    product_name: formData.get('product-name'),
    product_type: formData.get('product-type'),
    payment_status: formData.get('payment-status'),
  });

  console.log('validatedFields', validatedFields);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to add an order.',
    };
  }

  const {
    customer_id,
    product_id,
    product_name,
    product_type,
    payment_status,
  } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO orders (customer_id, product_id, product_name, product_type, status, date)
      VALUES (${customer_id}, ${product_id}, ${product_name}, ${product_type}, ${payment_status}, ${date})
      `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to add this order.',
    };
  }

  revalidatePath('/dashboard/orders');
  redirect('/dashboard/orders');
}

export async function deleteOrder(id: string) {
  try {
    await sql`
      DELETE FROM orders
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to delete this order.');
  }

  revalidatePath('/dashboard/orders');
  redirect('/dashboard/orders');
}

export async function updateOrder(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = CreateOrder.safeParse({
    customer_id: formData.get('customer'),
    product_id: formData.get('product-id'),
    product_name: formData.get('product-name'),
    product_type: formData.get('product-type'),
    payment_status: formData.get('payment-status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to update this order.',
    };
  }

  const {
    customer_id,
    product_id,
    product_name,
    product_type,
    payment_status,
  } = validatedFields.data;

  try {
    await sql`
      UPDATE orders
      SET customer_id = ${customer_id},
          product_id = ${product_id},
          product_name = ${product_name},
          product_type = ${product_type},
          status = ${payment_status}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to update this order.',
    };
  }

  revalidatePath('/dashboard/orders');
  redirect('/dashboard/orders');
}
