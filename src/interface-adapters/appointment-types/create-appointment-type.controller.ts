import { createAppointmentTypeUseCase } from '@/src/application/use-cases/appointment-types/create-appointment-type.use-case';
import { InputParseError } from '@/src/entities/errors/common';
import {
  CreatedAppointmentType,
  createdAppointmentTypeSchema,
} from '@/src/entities/models/appointment-types';

export async function createAppointmentTypeController(
  payload: CreatedAppointmentType,
) {
  const { data, error: inputParseError } =
    createdAppointmentTypeSchema.safeParse(payload);
  if (inputParseError) {
    throw new InputParseError(
      'Please provide all the missing fields.',
      inputParseError,
    );
  }
  return createAppointmentTypeUseCase({
    name: data.name,
    price: data.price,
    duration: data.duration,
    session_count: data.session_count,
  });
}
