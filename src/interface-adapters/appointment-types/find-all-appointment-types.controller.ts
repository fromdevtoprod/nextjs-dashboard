import { findAllAppointmentTypesUseCase } from '@/src/application/use-cases/appointment-types/find-all-appointment-types.use-case';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';

export async function findAllAppointmentTypesController(): Promise<
  SelectedAppointmentType[]
> {
  return findAllAppointmentTypesUseCase();
}
