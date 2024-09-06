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
    order_id: formData.get('order-id'),
    date: formData.get('date'),
    end_date: formData.get('end-date'),
    time: formData.get('time'),
    product_id: formData.get('product-id'),
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
    id: z.string(),
    order_id: z.string().min(1, { message: 'Order required' }),
    date: z.string().min(1, { message: 'Date required' }),
    end_date: z.string().min(1, { message: 'End date required' }),
    time: z.string().min(1, { message: 'Time required' }),
    product_id: z.string().min(1, { message: 'Product required' }),
  });

  return FormSchema.omit({ id: true });
}
