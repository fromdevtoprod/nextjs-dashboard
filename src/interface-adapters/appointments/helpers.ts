import { z } from 'zod';
import { CreateAppointmentPayload } from '@/src/application/repositories/appointments.repository.interface';
import { InputParseError } from '@/src/entities/errors/common';

const inputSchema = z.object({});

export function parseAppointmentForm(input: any): CreateAppointmentPayload {
  const { data, error: inputParseError } = inputSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError(
      'Please fill all the missing fields.',
      inputParseError,
    );
  }
  return data;
}
