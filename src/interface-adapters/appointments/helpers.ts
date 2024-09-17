import { z } from 'zod';
import { CreateAppointmentUseCasePayload } from '@/src/application/use-cases/appointments/create-appointment.use-case';
import { InputParseError } from '@/src/entities/errors/common';

const inputSchema = z.object({
  customer_id: z.string().min(1, { message: 'Please select a customer.' }),
  date: z.string().min(1, { message: 'Please select a date.' }),
  end_date: z.string().min(1, { message: 'Please select an end date.' }),
  order_id: z.string().min(1, { message: 'Please select an order.' }),
  product_id: z.string().min(1, { message: 'Please select a product.' }),
  time: z.string().min(1, { message: 'Please select a time.' }),
});

export function parseAppointmentForm(
  input: any,
): CreateAppointmentUseCasePayload {
  const { data, error: inputParseError } = inputSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError(
      'Please fill all the missing fields.',
      inputParseError,
    );
  }
  return {
    customerId: data.customer_id,
    date: `${data.date} ${data.time}`,
    endDate: data.end_date,
    orderId: data.order_id,
    productId: data.product_id,
  };
}
