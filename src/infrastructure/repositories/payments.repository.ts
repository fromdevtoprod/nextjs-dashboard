import { sql } from '@vercel/postgres';
import {
  CreatePaymentPayload,
  IPaymentsRepository,
} from '@/src/application/repositories/payments.repository.interface';
import { SelectedPayment } from '@/src/entities/models/payment';

export class PaymentsRepository implements IPaymentsRepository {
  public async createPayment(
    payload: CreatePaymentPayload,
  ): Promise<SelectedPayment> {
    const queryResult = await sql<SelectedPayment>`
      INSERT INTO payments (amount, appointment_id, customer_id, date, package_id, status, method)
      VALUES (${payload.amount}, ${payload.appointmentId}, ${payload.customerId}, ${payload.date}, ${payload.packageId}, ${payload.status}, ${payload.method})
      RETURNING *;
    `;
    return queryResult.rows[0];
  }
}
