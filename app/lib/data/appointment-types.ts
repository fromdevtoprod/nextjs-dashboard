import {
  AppointmentTypesWithRemainingSessions,
  findAppointmentTypesWithRemainingSessionsUseCase,
} from '@/src/application/use-cases/appointment-types/find-appointment-types-with-remaining-sessions.use-case';
import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { findAllAppointmentTypesController } from '@/src/interface-adapters/appointment-types/find-all-appointment-types.controller';

export async function fetchAllAppointmentTypes(): Promise<
  SelectedAppointmentType[]
> {
  try {
    const appointmentTypes = await findAllAppointmentTypesController();
    return appointmentTypes;
  } catch (err) {
    console.error(
      'fetchAllAppointmentTypes >> findAllAppointmentTypesController :',
      err,
    );
    throw new Error('Failed to fetch all appointment types.');
  }
}

export async function fetchAppointmentTypesWithRemainingSessions(
  customers: SelectedCustomer[],
): Promise<AppointmentTypesWithRemainingSessions[]> {
  try {
    const appointmentTypesWithRemainingSessions =
      await findAppointmentTypesWithRemainingSessionsUseCase(customers);
    return appointmentTypesWithRemainingSessions;
  } catch (err) {
    console.error(
      'fetchAppointmentTypesWithRemainingSessions >> findAppointmentTypesWithRemainingSessionsUseCase :',
      err,
    );
    throw new Error(
      'Failed to fetch all appointment types with remaining sessions.',
    );
  }
}
