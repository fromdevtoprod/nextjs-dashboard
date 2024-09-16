'use server';

import { sql } from '@vercel/postgres';
import { InputParseError } from '@/src/entities/errors/common';
import { createCustomerController } from '@/src/interface-adapters/customers/create-customer.controller';
import { validatedCustomerFields } from './schemas';
import { getDatabaseError, getFieldErrors, validateAndRedirect } from './utils';

type State = {
  errors?: {
    name?: string[];
    email?: string[];
  };
  message?: string | null;
};

export async function createCustomer(prevState: State, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    console.log('data', data);
    await createCustomerController(data);
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        errors: error.fieldErrors,
        message: error.message,
      };
    }
    console.error('error', error);
    return {
      message:
        'An error happened while creating a customer. Please try again later.',
    };
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
