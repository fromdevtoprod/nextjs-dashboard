import { SelectedPayment } from '@/src/entities/models/payment';

export type CreatePaymentPayload = {
  amount: string;
  appointmentId: string;
  customerId: string;
  date: string;
  packageId: string;
  status: string;
  method: string;
};

export type UpdatePaymentPayload = CreatePaymentPayload & { id: string };

export interface IPaymentsRepository {
  createPayment(payload: CreatePaymentPayload): Promise<SelectedPayment>;
}
