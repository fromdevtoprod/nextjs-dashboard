'use server';

import { InputParseError } from '@/src/entities/errors/common';
import { createCureController } from '@/src/interface-adapters/cures/create-cure.controller';
import { deleteCureController } from '@/src/interface-adapters/cures/delete-cure.controller';
import { updateCureController } from '@/src/interface-adapters/cures/update-cure.controller';
import { validateAndRedirect } from './utils';

type State = {
  errors?: {
    name?: string[];
    amount?: string[];
    session_number?: string[];
  };
  message?: string | null;
};

export async function createCure(prevState: State, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    console.log('data', data);
    await createCureController(data);
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        errors: error.fieldErrors,
        message: error.message,
      };
    }
    console.error('createCure >> createCureController', error);
    return {
      message:
        'An error happened while creating a cure. Please try again later.',
    };
  }
  validateAndRedirect('cures');
}

export async function deleteCure(id: string) {
  try {
    await deleteCureController(id);
  } catch (error) {
    console.error('deleteCure >> deleteCureController', error);
    return {
      message: `Failed to delete this cure.`,
    };
  }
  validateAndRedirect('cures');
}

export async function updateCure(
  id: string,
  prevState: State,
  formData: FormData,
) {
  try {
    const data = Object.fromEntries(formData.entries());
    await updateCureController(id, {
      amount: data.amount,
      care_1: data.care_1,
      session_number_1: data.session_number_1,
      care_2: data.care_2,
      session_number_2: data.session_number_2,
      id,
      name: data.name,
    });
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        errors: error.fieldErrors,
        message: error.message,
      };
    }
    console.error('updateCure >> updateCureController', error);
    return {
      message:
        'An error happened while updating a cure. Please try again later.',
    };
  }
  validateAndRedirect('cures');
}
