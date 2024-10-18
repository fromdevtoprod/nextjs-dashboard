import { AppointmentType } from './appointment-types';
import { Customer } from './customer';

export type Package = {
  id: string;
  appointmentType: AppointmentType;
  appointmentTypeId: string;
  customer: Customer;
  customerId: string;
  remaining_sessions: number;
  start_date: Date;
};
