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
  order_id: z.string().min(1, { message: 'Order required' }),
  date: z.string().min(1, { message: 'Date required' }),
  end_date: z.string().min(1, { message: 'End date required' }),
  time: z.string().min(1, { message: 'Time required' }),
});

const CreateOrder = FormSchema.omit({ id: true });

export async function createAppointment(prevState: State, formData: FormData) {
  const validatedFields = CreateOrder.safeParse({
    order_id: formData.get('order-id'),
    date: formData.get('date'),
    end_date: formData.get('end-date'),
    time: formData.get('time'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to add this appointment.',
    };
  }

  const { order_id, date, end_date, time } = validatedFields.data;
  const completeDateWithTime = `${date} ${time}`;

  try {
    await sql`INSERT INTO appointments (order_id, date, end_date) VALUES (${order_id}, ${completeDateWithTime}, ${end_date})`;
    // TODO: change appointment status if all appointments are completed
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to add this appointment.',
    };
  }

  revalidatePath('/dashboard/appointments');
  redirect('/dashboard/appointments');
}

export async function deleteAppointment(appointmentId: string) {
  try {
    await sql`DELETE FROM appointments WHERE id = ${appointmentId}`;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      message: 'Database Error: Failed to delete this appointment.',
    };
  }

  revalidatePath('/dashboard/appointments');
  redirect('/dashboard/appointments');
}
