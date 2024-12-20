import { Payment } from '@/src/entities/models/payment';

export type CreatePaymentPayload = {
  amount: string;
  appointmentId: string;
  customerId: string;
  date: string;
  packageId: string | null | undefined;
  status: string;
  method: string;
};

export type UpdatePaymentPayload = {
  id: string;
  method: string;
  status: string;
};

export interface IPaymentsRepository {
  create(payload: CreatePaymentPayload, userId: string): Promise<any>;
  deletePayment(appointmentId: string): Promise<void>;
  deletePaymentByAppointmentId(appointmentId: string): Promise<void>;
  findAll(userId: string): Promise<Payment[]>;
  findById(id: string): Promise<Payment | null>;
  updatePayment(payload: UpdatePaymentPayload): Promise<Payment | null>;
}
