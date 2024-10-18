import { findAllAppointmentTypesUseCase } from '@/src/application/use-cases/appointment-types/find-all-appointment-types.use-case';
import {
  AppointmentTypesWithRemainingSessions,
  findAppointmentTypesWithRemainingSessionsUseCase,
} from '@/src/application/use-cases/appointment-types/find-appointment-types-with-remaining-sessions.use-case';
import { AppointmentType } from '@/src/entities/models/appointment-types';
import { Customer } from '@/src/entities/models/customer';

export async function fetchAllAppointmentTypes(): Promise<AppointmentType[]> {
  try {
    const appointmentTypes = await findAllAppointmentTypesUseCase();
    return appointmentTypes;
  } catch (err) {
    console.error(
      'fetchAllAppointmentTypes >> findAllAppointmentTypesUseCase :',
      err,
    );
    return [];
  }
}

export async function fetchAppointmentTypesWithRemainingSessions(
  customers: Customer[],
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
    return [];
  }
}
