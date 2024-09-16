import { z } from 'zod';

export function validatedCustomerFields(formData: FormData) {
  return getCustomerSchema().safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    birth_date: formData.get('birth_date'),
    pathology: formData.get('pathology'),
  });
}

export function validatedOrderFields(formData: FormData) {
  return getOrderSchema().safeParse({
    customer_id: formData.get('customer'),
    product_id: formData.get('product-id'),
    payment_status: formData.get('payment-status'),
  });
}

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

function getCustomerSchema() {
  const FormSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string(),
    phone: z.string(),
    birth_date: z.string().min(1, { message: 'Birth date is required' }),
    pathology: z.string(),
  });

  return FormSchema.omit({ id: true });
}

function getOrderSchema() {
  const FormSchema = z.object({
    id: z.string(),
    customer_id: z.string().min(1, { message: 'The customer is required' }),
    product_id: z.string().min(1, { message: 'The product is required' }),
    payment_status: z.enum(['pending', 'paid']),
    date: z.string(),
  });

  return FormSchema.omit({ id: true, date: true });
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
