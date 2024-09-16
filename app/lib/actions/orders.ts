'use server';

import { InputParseError } from '@/src/entities/errors/common';
import { createOrderController } from '@/src/interface-adapters/orders/create-order.controller';
import { updateOrderController } from '@/src/interface-adapters/orders/update-order.controller';
import { deleteOrderController } from '@/src/interface-adapters/orders/delete-order.controller';
import { validateAndRedirect } from './utils';

type State = {
  errors?: {
    name?: string[];
    amount?: string[];
    session_number?: string[];
  };
  message?: string | null;
};

export async function createOrder(prevState: State, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    console.log('data', data);
    await createOrderController(data);
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        errors: error.fieldErrors,
        message: error.message,
      };
    }
    console.error('createOrder >> createOrderController', error);
    return {
      message:
        'An error happened while adding an order. Please try again later.',
    };
  }
  validateAndRedirect('orders');
}

export async function deleteOrder(id: string) {
  try {
    await deleteOrderController(id);
  } catch (error) {
    console.error('deleteOrder >> deleteOrderController', error);
    return {
      message: `Failed to delete this order.`,
    };
  }
  validateAndRedirect('orders');
}

export async function updateOrder(
  id: string,
  prevState: State,
  formData: FormData,
) {
  try {
    const data = Object.fromEntries(formData.entries());
    console.log('data', data);
    await updateOrderController(id, data);
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        errors: error.fieldErrors,
        message: error.message,
      };
    }
    console.error('updateOrder >> updateOrderController', error);
    return {
      message:
        'An error happened while updating an order. Please try again later.',
    };
  }
  validateAndRedirect('orders');
}
