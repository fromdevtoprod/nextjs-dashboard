import { SelectedAppointmentType } from '@/src/entities/models/appointment-types';
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
