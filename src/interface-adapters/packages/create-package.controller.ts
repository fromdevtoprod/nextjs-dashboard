import { createPackageUseCase } from '@/src/application/use-cases/packages/create-package.use-case';
import { InputParseError } from '@/src/entities/errors/common';
import {
  CreatedPackage,
  createdPackageSchema,
} from '@/src/entities/models/package-model';

export async function createPackageController(payload: CreatedPackage) {
  const { data, error: inputParseError } =
    createdPackageSchema.safeParse(payload);
  if (inputParseError) {
    throw new InputParseError(
      'Please provide all the missing fields.',
      inputParseError,
    );
  }
  return createPackageUseCase({
    appointment_type_id: data.appointment_type_id,
    customer_id: data.customer_id,
    remaining_sessions: data.remaining_sessions,
    start_date: data.start_date,
  });
}
