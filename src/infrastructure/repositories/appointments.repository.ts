import {
  CreateAppointmentPayload,
  FindAllAppointmentsByDatePayload,
  IAppointmentsRepository,
} from '@/src/application/repositories/appointments.repository.interface';
import { Appointment } from '@/src/entities/models/appointment';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/prisma';

export class AppointmentsRepository implements IAppointmentsRepository {
  public async countLastYearAppointments(): Promise<number> {
    return prisma.appointment.count({
      where: {
        date: {
          gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 365),
        },
      },
    });
    // const queryResult = await sql<{ count: number }>`
    //   SELECT COUNT(*)
    //   FROM appointments
    //   WHERE date >= NOW() - INTERVAL '1 year'
    // `;
    // return queryResult.rows[0].count;
  }

  public async countAllUpcomingAppointments(): Promise<number> {
    const prisma = new PrismaClient();
    return prisma.appointment.count({
      where: {
        date: {
          gte: new Date(),
        },
      },
    });
  }

  public async createAppointment(
    payload: CreateAppointmentPayload,
    userId: string,
  ): Promise<Appointment | null> {
    const createdAppointment = await prisma.appointment.create({
      data: {
        appointmentTypeId: payload.appointment_type_id,
        customerId: payload.customer_id,
        date: new Date(payload.date),
        packageId: payload.package_id,
        userId,
      },
    });
    return this.findAppointmentById(createdAppointment.id);
  }

  public async deleteAppointment(id: string): Promise<void> {
    await prisma.appointment.delete({
      where: {
        id,
      },
    });
  }

  public async deleteByAppointmentTypeId(
    appointmentTypeId: string,
  ): Promise<void> {
    prisma.appointment.deleteMany({
      where: {
        appointmentTypeId,
      },
    });
  }

  public async deleteByCustomerId(customerId: string): Promise<void> {
    prisma.appointment.deleteMany({
      where: {
        customerId,
      },
    });
  }

  public async findAllAppointments(): Promise<Appointment[]> {
    return prisma.appointment.findMany({
      include: {
        appointmentType: true,
        customer: true,
        payments: true,
      },
    });
  }

  public async findAllAppointmentsByCustomer(
    customerId: string,
  ): Promise<Appointment[]> {
    return prisma.appointment.findMany({
      include: {
        appointmentType: true,
        notes: true,
      },
      orderBy: {
        date: 'desc',
      },
      where: {
        customerId,
      },
    });
  }

  public async findAllAppointmentsByDate(
    { day, month, year }: FindAllAppointmentsByDatePayload,
    userId: string,
  ): Promise<Appointment[]> {
    return prisma.appointment.findMany({
      include: {
        appointmentType: true,
        customer: true,
        notes: true,
        payments: true,
      },
      where: {
        date: {
          lte: new Date(`${year}-${month}-${day} 23:59:59`),
          gte: new Date(`${year}-${month}-${day} 00:00:00`),
        },
        userId,
      },
    });
  }

  public async findAppointmentById(id: string): Promise<Appointment | null> {
    return prisma.appointment.findUnique({
      include: {
        appointmentType: true,
        customer: true,
        payments: true,
      },
      where: {
        id,
      },
    });
  }
}
