import { Customer } from './customer';
import { AppointmentType } from './appointment-types';
import { Payment } from './payment';
import { Notes } from './notes';

type BaseAppointment = {
  appointmentTypeId: string;
  customerId: string;
  date: Date;
  id: string;
  packageId: string | null;
};

export type Appointment = BaseAppointment & {
  appointmentType: AppointmentType;
  customer?: Customer;
  notes?: Notes[];
  payments?: Payment[];
};

export type AppointmentWithDateAndTime = Appointment & {
  date: string;
  time: string;
};
