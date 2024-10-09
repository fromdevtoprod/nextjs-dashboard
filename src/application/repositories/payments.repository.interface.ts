import { SelectedPayment } from '@/src/entities/models/payment';

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
  createPayment(payload: CreatePaymentPayload): Promise<SelectedPayment>;
  deletePayment(appointmentId: string): Promise<void>;
  deletePaymentByAppointmentId(appointmentId: string): Promise<void>;
  findById(paymentId: string): Promise<SelectedPayment>;
  findAll(): Promise<SelectedPayment[]>;
  updatePayment(payload: UpdatePaymentPayload): Promise<SelectedPayment>;
}
