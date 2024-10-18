import { Appointment } from './appointment';
import { Customer } from './customer';

export type Payment = {
  id: string;
  appointment?: Appointment;
  appointmentId: string;
  amount: number;
  customer?: Customer;
  customerId: string;
  date: Date;
  method: string;
  packageId: string | null;
  status: string;
};
