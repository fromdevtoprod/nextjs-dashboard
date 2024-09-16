import { z } from 'zod';

export function validatedAppointmentFields(formData: FormData) {
  return getAppointmentSchema().safeParse({
    customerId: formData.get('customer-id'),
    date: formData.get('date'),
    endDate: formData.get('end-date'),
    orderId: formData.get('order-id'),
    productId: formData.get('product-id'),
    time: formData.get('time'),
  });
}

function getAppointmentSchema() {
  const FormSchema = z.object({
    customerId: z.string(),
    date: z.string().min(1, { message: 'Date required' }),
    endDate: z.string().min(1, { message: 'End date required' }),
    id: z.string(),
    orderId: z.string(),
    productId: z.string().min(1, { message: 'Product required' }),
    time: z.string().min(1, { message: 'Time required' }),
  });

  return FormSchema.omit({ id: true });
}
