'use server';

import { InputParseError } from '@/src/entities/errors/common';
import { createCareController } from '@/src/interface-adapters/cares/create-care.controller';
import { deleteCareController } from '@/src/interface-adapters/cares/delete-care.controller';
import { updateCareController } from '@/src/interface-adapters/cares/update-care.controller';
import { validateAndRedirect } from './utils';

type State = {
  errors?: {
    name?: string[];
    category?: string[];
    amount?: string[];
    duration?: string[];
  };
  message?: string | null;
};

export async function createCare(prevState: State, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    await createCareController(data);
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        errors: error.fieldErrors,
        message: error.message,
      };
    }
    return {
      message:
        'An error happened while creating a care. Please try again later.',
    };
  }
  validateAndRedirect('cares');
}

export async function deleteCare(id: string) {
  try {
    await deleteCareController(id);
  } catch (error) {
    return {
      message: `Failed to delete this care.`,
    };
  }
  validateAndRedirect('cares');
}

export async function updateCare(
  id: string,
  prevState: State,
  formData: FormData,
) {
  try {
    const data = Object.fromEntries(formData.entries());
    await updateCareController(id, data);
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        errors: error.fieldErrors,
        message: error.message,
      };
    }
    return {
      message:
        'An error happened while updating a care. Please try again later.',
    };
  }
  validateAndRedirect('cares');
}
