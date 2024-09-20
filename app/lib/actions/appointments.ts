'use server';

import { validateAndRedirect } from './utils';
import { InputParseError } from '@/src/entities/errors/common';
import { createAppointmentController } from '@/src/interface-adapters/appointments/create-appointment.controller';
import { deleteAppointmentController } from '@/src/interface-adapters/appointments/delete-appointment.controller';

type State = {
  errors?: {
    name?: string[];
    date?: string[];
    time?: string[];
    product?: string[];
  };
  message?: string | null;
};

export async function createAppointment(prevState: State, formData: FormData) {
  try {
    const data = Object.fromEntries(formData.entries());
    await createAppointmentController(data);
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        errors: error.fieldErrors,
        message: error.message,
      };
    }
    console.error('createAppointment >> createAppointmentController', error);
    return {
      message:
        'An error happened while creating an appointment. Please try again later.',
    };
  }
  validateAndRedirect('appointments');
}

export async function deleteAppointment(
  appointmentId: string,
  orderId: string,
) {
  try {
    await deleteAppointmentController({ appointmentId, orderId });
  } catch (error) {
    if (error instanceof InputParseError) {
      return {
        errors: error.fieldErrors,
        message: error.message,
      };
    }
    console.error('deleteAppointment >> deleteAppointmentController', error);
    return {
      message:
        'An error happened while deleting an appointment. Please try again later.',
    };
  }
  validateAndRedirect('appointments');
}
