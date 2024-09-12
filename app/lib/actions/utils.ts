import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export function validateAndRedirect(
  items: 'appointments' | 'cares' | 'cure' | 'customers' | 'orders',
) {
  const url = `/dashboard/${items}`;
  revalidatePath(url);
  redirect(url);
}

export function getFieldErrors(error: z.ZodError<any>) {
  return {
    errors: error.flatten().fieldErrors,
    message: 'Missing fields. Please fill in all required fields.',
  };
}

export function getDatabaseError({
  error,
  item,
  operation,
}: {
  error: unknown;
  item: 'appointment' | 'care' | 'cure' | 'customer' | 'order';
  operation: 'insert' | 'update' | 'delete';
}) {
  console.error('Database Error:', error);
  return {
    message: `Database Error: Failed to ${operation} this ${item}.`,
  };
}
