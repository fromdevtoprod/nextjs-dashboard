'use server';

import { sql } from '@vercel/postgres';
import { isCureProductType } from '@/app/business/cure';
import { getDatabaseError, getFieldErrors, validateAndRedirect } from './utils';
import { validatedAppointmentFields } from './schemas';
import { fetchOrderById } from '../data/orders';
import { getCureTotalSessionNumber } from '../data/cure';
import { getInsertOrderRequest, getUpdateOrderStatusRequest } from './orders';

type State = {
  errors?: {
    name?: string[];
    date?: string[];
    time?: string[];
    product?: string[];
  };
  message?: string | null;
};

export async function createAppointment(prevState: State, formData: FormData) {
  const validatedFields = validatedAppointmentFields(formData);
  if (!validatedFields.success) {
    return getFieldErrors(validatedFields.error);
  }

  let { order_id } = validatedFields.data;
  const { date, end_date, time } = validatedFields.data;
  const completeDateWithTime = `${date} ${time}`;

  try {
    if (!order_id) {
      const insertOrderResult = await getInsertOrderRequest({
        customerId: validatedFields.data.customer_id,
        productId: validatedFields.data.product_id,
        paymentStatus: 'pending',
      });
      order_id = insertOrderResult.rows[0].id;
    }
    await sql`INSERT INTO appointments (order_id, date, end_date, care_id) VALUES (${order_id}, ${completeDateWithTime}, ${end_date}, ${validatedFields.data.product_id})`;
    const appointmentsCount = await getAppointmentCountByOrder(order_id);
    const { product_id, product_type } = await fetchOrderById(order_id);

    if (isCureProductType(product_type)) {
      const totalSessionNumber = await getCureTotalSessionNumber(product_id);
      if (totalSessionNumber === appointmentsCount) {
        await getUpdateOrderStatusRequest(order_id, 'done');
      }
    } else {
      await getUpdateOrderStatusRequest(order_id, 'done');
    }
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
    await getDeleteAppointmentRequest(appointmentId);
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

async function getAppointmentCountByOrder(orderId: string) {
  const appointmentsCount =
    await sql`SELECT COUNT(*) FROM appointments WHERE order_id = ${orderId}`;
  return appointmentsCount.rows[0].count as number;
}

async function getDeleteAppointmentRequest(appointmentId: string) {
  return sql`DELETE FROM appointments WHERE id = ${appointmentId}`;
}

export async function getDeleteAppointmentByOrderRequest(orderId: string) {
  return sql`DELETE FROM appointments WHERE order_id = ${orderId}`;
}
