'use server';

import { sql } from '@vercel/postgres';
import { getFieldErrors, validateAndRedirect } from './utils';
import { validatedAppointmentFields } from './schemas';
import { fetchOrderById } from '../data/orders';
import { getCureTotalSessionNumber } from '../data/cure';
import {
  executeInsertOrderRequest,
  executeUpdateOrderStatusRequest,
} from '../sql/order';
import {
  executeCountAppointmentRequest,
  executeDeleteAppointmentRequest,
} from '../sql/appointment';

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

  let { orderId } = validatedFields.data;
  const { customerId, date, endDate, productId, time } = validatedFields.data;
  const completeDateWithTime = `${date} ${time}`;

  try {
    if (!orderId) {
      const insertOrderResult = await executeInsertOrderRequest({
        customerId,
        productId,
        paymentStatus: 'pending',
      });
      orderId = insertOrderResult.rows[0].id;
    }
    await sql`INSERT INTO appointments (order_id, date, end_date, care_id) VALUES (${orderId}, ${completeDateWithTime}, ${endDate}, ${productId})`;
    const appointmentCount = await executeCountAppointmentRequest(orderId);
    const { product_id, product_type } = await fetchOrderById(orderId);

    if (product_type === 'cure') {
      const totalSessionNumber = await getCureTotalSessionNumber(product_id);
      if (totalSessionNumber === appointmentCount) {
        await executeUpdateOrderStatusRequest(orderId, 'done');
      }
    } else {
      await executeUpdateOrderStatusRequest(orderId, 'done');
    }
  } catch (error) {
    return {
      message: `Database Error: Failed to insert this appointment.`,
    };
  }

  validateAndRedirect('appointments');
}

export async function deleteAppointment(
  appointmentId: string,
  orderId: string,
) {
  try {
    await executeDeleteAppointmentRequest(appointmentId);
    await executeUpdateOrderStatusRequest(orderId, 'pending');
  } catch (error) {
    return {
      message: `Database Error: Failed to delete this appointment.`,
    };
  }
  validateAndRedirect('appointments');
}
