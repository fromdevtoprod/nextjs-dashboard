'use server';

import { InputParseError } from '@/src/entities/errors/common';
import { createCustomerController } from '@/src/interface-adapters/customers/create-customer.controller';
import { deleteCustomerController } from '@/src/interface-adapters/customers/delete-customer.controller';
import { updateCustomerController } from '@/src/interface-adapters/customers/update-customer.controller';
import { validateAndRedirect } from './utils';

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
    await deleteCustomerController(id);
  } catch (error) {
    console.error('error', error);
    return {
      message: `Failed to delete this customer.`,
    };
  }
  validateAndRedirect('customers');
}

export async function updateCustomer(
  id: string,
  prevState: State,
  formData: FormData,
) {
  try {
    const data = Object.fromEntries(formData.entries());
    await updateCustomerController(id, data);
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        errors: error.fieldErrors,
        message: error.message,
      };
    }
    console.error('updateCustomer >> updateCustomerController', error);
    return {
      message:
        'An error happened while updating a customer. Please try again later.',
    };
  }
  validateAndRedirect('customers');
}
