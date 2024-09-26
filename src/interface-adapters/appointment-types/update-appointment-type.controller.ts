import { updateAppointmentTypeUseCase } from '@/src/application/use-cases/appointment-types/update-appointment-type.use-case';
import { InputParseError } from '@/src/entities/errors/common';
import {
  SelectedAppointmentType,
  selectedAppointmentTypeSchema,
} from '@/src/entities/models/appointment-types';

export async function updateAppointmentTypeController(
  payload: SelectedAppointmentType,
) {
  const { data, error: inputParseError } =
    selectedAppointmentTypeSchema.safeParse(payload);
  if (inputParseError) {
    throw new InputParseError(
      'Please provide all the missing fields.',
      inputParseError,
    );
  }
  return updateAppointmentTypeUseCase({
    duration: data.duration,
    id: data.id,
    name: data.name,
    price: data.price,
    session_count: data.session_count,
  });
}
