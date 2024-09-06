'use server';

import { sql } from '@vercel/postgres';
import { getDatabaseError, getFieldErrors, validateAndRedirect } from './utils';
import { validatedAppointmentFields } from './schemas';
import { fetchOrderById } from '../data/orders';
import { getCureTotalSessionNumber } from '../data/cure';
import { getUpdateOrderStatusRequest } from './orders';

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

  // order id: 0dac7f3b-8ef8-4f07-af0f-9887b585e5fb
  // product id : e8189c93-170e-4eda-84eb-3820173e9d98

  try {
    await sql`INSERT INTO appointments (order_id, date, end_date, product_id) VALUES (${order_id}, ${completeDateWithTime}, ${end_date}, ${validatedFields.data.product_id})`;
    const appointmentsCount = await getAppointmentCountByOrder(order_id);
    const { product_id, product_type } = await fetchOrderById(order_id);

    if (isCureProductType(product_type)) {
      const totalSessionNumber = await getCureTotalSessionNumber(product_id);
      if (totalSessionNumber > appointmentsCount) return;
    }
    await getUpdateOrderStatusRequest(order_id, 'done');
  } catch (error) {
    return getDatabaseError({
      error,
      item: 'appointment',
      operation: 'insert',
    });
  }

  validateAndRedirect('appointments');
}

export async function deleteAppointment(
  appointmentId: string,
  orderId: string,
) {
  try {
    await sql`DELETE FROM appointments WHERE id = ${appointmentId}`;
    await getUpdateOrderStatusRequest(orderId, 'pending');
  } catch (error) {
    return getDatabaseError({
      error,
      item: 'appointment',
      operation: 'delete',
    });
  }

  validateAndRedirect('appointments');
}

function isCureProductType(productType: string) {
  return productType === 'cure';
}

async function getAppointmentCountByOrder(orderId: string) {
  const appointmentsCount =
    await sql`SELECT COUNT(*) FROM appointments WHERE order_id = ${orderId}`;
  return appointmentsCount.rows[0].count as number;
}
