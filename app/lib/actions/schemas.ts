import { z } from 'zod';

export function validatedCareFields(formData: FormData) {
  return getCareSchema().safeParse({
    category_id: formData.get('category'),
    duration: formData.get('duration'),
    product_amount: formData.get('amount'),
    product_name: formData.get('name'),
  });
}

export function validatedCureFields(formData: FormData) {
  return getCureSchema().safeParse({
    product_name: formData.get('name'),
    care_1_id: formData.get('care_1'),
    care_1_session_number: formData.get('session_number_1'),
    care_2_id: formData.get('care_2'),
    care_2_session_number: formData.get('session_number_2'),
    product_amount: formData.get('amount'),
  });
}

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

function getCareSchema() {
  const FormSchema = z.object({
    id: z.string(),
    category_id: z.string().min(1, { message: 'Category is required' }),
    duration: z.coerce
      .number()
      .gt(0, { message: 'Please enter a duration greater than 0.' }),
    product_amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than 0€.' }),
    product_name: z.string().min(1, { message: 'Name is required' }),
  });

  return FormSchema.omit({ id: true });
}

function getCureSchema() {
  const FormSchema = z.object({
    product_id: z.string(),
    product_name: z.string().min(1, { message: 'Name is required' }),
    care_1_id: z.string().min(1, { message: 'One minimal care is required' }),
    care_1_session_number: z.coerce
      .number()
      .gt(0, { message: 'Please enter a session number greater than 0.' }),
    care_2_id: z.string().nullable(),
    care_2_session_number: z.coerce.number(),
    product_amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than 0.' }),
  });

  return FormSchema.omit({ product_id: true });
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