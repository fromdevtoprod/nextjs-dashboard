'use server';

import { sql } from '@vercel/postgres';
import { getDatabaseError, getFieldErrors, validateAndRedirect } from './utils';
import { validatedAppointmentFields } from './schemas';

type State = {
  errors?: {
    name?: string[];
    amount?: string[];
    session_number?: string[];
  };
  message?: string | null;
};

export async function createAppointment(prevState: State, formData: FormData) {
  const validatedFields = validatedAppointmentFields(formData);
  if (!validatedFields.success) {
    return getFieldErrors(validatedFields.error);
  }

  const { order_id, date, end_date, time } = validatedFields.data;
  const completeDateWithTime = `${date} ${time}`;

  try {
    await sql`INSERT INTO appointments (order_id, date, end_date) VALUES (${order_id}, ${completeDateWithTime}, ${end_date})`;
  } catch (error) {
    return getDatabaseError({
      error,
      item: 'appointment',
      operation: 'insert',
    });
  }

  validateAndRedirect('appointments');
}

export async function deleteAppointment(appointmentId: string) {
  try {
    await sql`DELETE FROM appointments WHERE id = ${appointmentId}`;
  } catch (error) {
    return getDatabaseError({
      error,
      item: 'appointment',
      operation: 'delete',
    });
  }

  validateAndRedirect('appointments');
}
