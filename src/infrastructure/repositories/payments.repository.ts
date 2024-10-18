import { sql } from '@vercel/postgres';
import {
  CreatePaymentPayload,
  IPaymentsRepository,
  UpdatePaymentPayload,
} from '@/src/application/repositories/payments.repository.interface';
import { SelectedPayment } from '@/src/entities/models/payment';
import { prisma } from '@/prisma';

export class PaymentsRepository implements IPaymentsRepository {
  public async create(payload: CreatePaymentPayload): Promise<any> {
    return prisma.payment.create({
      data: {
        amount: parseInt(payload.amount, 10),
        appointmentId: payload.appointmentId,
        customerId: payload.customerId,
        date: new Date(payload.date),
        packageId: payload.packageId,
        status: payload.status,
        method: payload.method,
      },
    });
    // const queryResult = await sql<SelectedPayment>`
    //   INSERT INTO payments (amount, appointment_id, customer_id, date, package_id, status, method)
    //   VALUES (${payload.amount}, ${payload.appointmentId}, ${payload.customerId}, ${payload.date}, ${payload.packageId}, ${payload.status}, ${payload.method})
    //   RETURNING *;
    // `;
    // return queryResult.rows[0];
  }

  public async deletePayment(appointmentId: string): Promise<void> {
    await sql`DELETE FROM payments WHERE id = ${appointmentId}`;
  }

  public async deletePaymentByAppointmentId(
    appointmentId: string,
  ): Promise<void> {
    await sql`DELETE FROM payments WHERE appointment_id = ${appointmentId}`;
  }

  public async findById(paymentId: string): Promise<SelectedPayment> {
    const queryResult = await sql<SelectedPayment>`
      SELECT
        payments.id,
        payments.amount,
        payments.appointment_id,
        payments.customer_id,
        payments.date,
        payments.package_id,
        payments.status,
        payments.method,
        customers.name AS customer_name,
        appointment_types.name AS appointment_type_name
      FROM payments
      LEFT JOIN appointments ON payments.appointment_id = appointments.id
      LEFT JOIN customers ON payments.customer_id = customers.id
      LEFT JOIN appointment_types ON appointments.appointment_type_id = appointment_types.id
      WHERE payments.id = ${paymentId}
    `;
    return queryResult.rows[0];
  }

  public async findAll(): Promise<any> {
    return prisma.payment.findMany({
      include: {
        appointment: {
          include: {
            appointmentType: true,
          },
        },
        customer: true,
      },
    });
    // const queryResult = await sql<SelectedPayment>`
    //   SELECT
    //     payments.id,
    //     payments.amount,
    //     payments.appointment_id,
    //     payments.customer_id,
    //     payments.date,
    //     payments.package_id,
    //     payments.status,
    //     payments.method,
    //     customers.name AS customer_name,
    //     appointment_types.name AS appointment_type_name
    //   FROM payments
    //   LEFT JOIN appointments ON payments.appointment_id = appointments.id
    //   LEFT JOIN customers ON payments.customer_id = customers.id
    //   LEFT JOIN appointment_types ON appointments.appointment_type_id = appointment_types.id
    //   ORDER BY payments.date DESC
    // `;
    // return queryResult.rows;
  }

  public async updatePayment(
    payload: UpdatePaymentPayload,
  ): Promise<SelectedPayment> {
    await sql<SelectedPayment>`
      UPDATE payments
      SET
        status = ${payload.status},
        method = ${payload.method}
      WHERE id = ${payload.id}
      RETURNING *;
    `;
    return this.findById(payload.id);
  }
}
