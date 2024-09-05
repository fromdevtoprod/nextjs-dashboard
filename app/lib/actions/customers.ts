'use server';

import { sql } from '@vercel/postgres';
import { getDatabaseError, getFieldErrors, validateAndRedirect } from './utils';
import { validatedCustomerFields } from './schemas';

type State = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

export async function createCustomer(prevState: State, formData: FormData) {
  const validatedFields = validatedCustomerFields(formData);
  if (!validatedFields.success) return getFieldErrors(validatedFields.error);

  const { name, email, phone, birth_date, pathology } = validatedFields.data;
  const formattedBirthDate = formatBirthDate(birth_date);

  if (!hasEmailOrPhone(phone, email)) return getEmailOrPhoneError();

  try {
    await sql`
      INSERT INTO customers (name, email, phone, birth_date, pathology) 
      VALUES (${name}, ${email}, ${phone}, ${formattedBirthDate}, ${pathology})
    `;
  } catch (error) {
    return getDatabaseError({ error, item: 'customer', operation: 'insert' });
  }

  validateAndRedirect('customers');
}

export async function deleteCustomer(id: string) {
  try {
    sql`DELETE FROM customers WHERE id = ${id}`;
  } catch (error) {
    return getDatabaseError({ error, item: 'customer', operation: 'delete' });
  }

  validateAndRedirect('customers');
}

export async function updateCustomer(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = validatedCustomerFields(formData);
  if (!validatedFields.success) return getFieldErrors(validatedFields.error);

  const { name, email, phone, birth_date, pathology } = validatedFields.data;

  if (!hasEmailOrPhone(phone, email)) return getEmailOrPhoneError();

  const formattedBirthDate = formatBirthDate(birth_date);

  try {
    await sql`
      UPDATE customers
      SET name = ${name},
        email = ${email},
        phone = ${phone},
        birth_date = ${formattedBirthDate},
        pathology = ${pathology}
      WHERE id = ${id}
    `;
  } catch (error) {
    return getDatabaseError({ error, item: 'customer', operation: 'update' });
  }

  validateAndRedirect('customers');
}

function hasEmailOrPhone(email: string, phone: string) {
  return email !== '' || phone !== '';
}

function getEmailOrPhoneError() {
  return {
    errors: {
      phone: ['Phone or email is required'],
      email: ['Email or phone is required'],
    },
    message: 'Missing fields. Failed to create this customer.',
  };
}

function formatBirthDate(birthDate: string) {
  const [day, month, year] = birthDate.split('/');
  return `${year}-${month}-${day}`;
}
