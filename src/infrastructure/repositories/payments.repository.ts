import {
  CreatePaymentPayload,
  IPaymentsRepository,
  UpdatePaymentPayload,
} from '@/src/application/repositories/payments.repository.interface';
import { Payment } from '@/src/entities/models/payment';
import { prisma } from '@/prisma';

export class PaymentsRepository implements IPaymentsRepository {
  public async create(
    payload: CreatePaymentPayload,
    userId: string,
  ): Promise<Payment> {
    return prisma.payment.create({
      data: {
        amount: parseInt(payload.amount, 10),
        appointmentId: payload.appointmentId,
        customerId: payload.customerId,
        date: new Date(payload.date),
        packageId: payload.packageId,
        status: payload.status,
        method: payload.method,
        userId,
      },
    });
  }

  public async deletePayment(id: string): Promise<void> {
    await prisma.payment.deleteMany({
      where: {
        id,
      },
    });
  }

  public async deletePaymentByAppointmentId(
    appointmentId: string,
  ): Promise<void> {
    await prisma.payment.deleteMany({
      where: {
        appointmentId,
      },
    });
  }

  public async findById(id: string): Promise<Payment | null> {
    return prisma.payment.findUnique({
      where: {
        id,
      },
      include: {
        appointment: {
          include: {
            appointmentType: true,
          },
        },
        customer: true,
      },
    });
  }

  public async findAll(userId: string): Promise<Payment[]> {
    return prisma.payment.findMany({
      include: {
        appointment: {
          include: {
            appointmentType: true,
          },
        },
        customer: true,
      },
      where: {
        userId,
      },
    });
  }

  public async updatePayment(
    payload: UpdatePaymentPayload,
  ): Promise<Payment | null> {
    await prisma.payment.update({
      where: {
        id: payload.id,
      },
      data: {
        status: payload.status,
        method: payload.method,
      },
    });
    return this.findById(payload.id);
  }
}
