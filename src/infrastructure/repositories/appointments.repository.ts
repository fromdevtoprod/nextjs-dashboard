import { sql } from '@vercel/postgres';
import {
  CreateAppointmentPayload,
  FindAllAppointmentsByDatePayload,
  IAppointmentsRepository,
} from '@/src/application/repositories/appointments.repository.interface';
import {
  Appointment,
  HistoryAppointment,
  SelectedAppointment,
  UpcomingAppointment,
} from '@/src/entities/models/appointment';
import { PrismaClient } from '@prisma/client';
import { prisma } from '@/prisma';

export class AppointmentsRepository implements IAppointmentsRepository {
  public async countLastYearAppointments(): Promise<number> {
    const queryResult = await sql<{ count: number }>`
      SELECT COUNT(*)
      FROM appointments
      WHERE date >= NOW() - INTERVAL '1 year'
    `;
    return queryResult.rows[0].count;
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
    // const queryResult = await sql<{ count: number }>`
    //   SELECT COUNT(*)
    //   FROM appointments
    //   WHERE date >= NOW()
    // `;
    // return queryResult.rows[0].count;
  }

  public async createAppointment(payload: CreateAppointmentPayload) {
    const createdAppointment = await prisma.appointment.create({
      data: {
        appointmentTypeId: payload.appointment_type_id,
        customerId: payload.customer_id,
        date: new Date(payload.date),
        packageId: payload.package_id,
      },
    });
    return prisma.appointment.findUnique({
      include: {
        appointmentType: true,
        customer: true,
      },
      where: {
        id: createdAppointment.id,
      },
    });
    // const queryResult = await sql<SelectedAppointment>`
    //   INSERT INTO appointments (
    //     appointment_type_id,
    //     customer_id,
    //     date,
    //     package_id
    //   ) VALUES (
    //     ${payload.appointment_type_id},
    //     ${payload.customer_id},
    //     ${payload.date},
    //     ${payload.package_id}
    //   ) RETURNING *
    // `;
    // const createdAppointment = queryResult.rows[0];
    // const queryResult2 = await sql<UpcomingAppointment>`
    //   SELECT
    //     appointments.id,
    //     appointments.date,
    //     appointment_types.name AS appointment_type_name,
    //     appointment_types.price AS appointment_type_price,
    //     appointment_types.session_count,
    //     customers.name AS client_name
    //   FROM appointments
    //   LEFT JOIN appointment_types ON appointment_types.id = appointments.appointment_type_id
    //   LEFT JOIN customers ON customers.id = appointments.customer_id
    //   WHERE appointments.id = ${createdAppointment.id}
    //   `;
    // return queryResult2.rows[0];
  }

  public async deleteAppointment(id: string): Promise<void> {
    await sql`DELETE FROM appointments WHERE id = ${id}`;
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

  public async findAllAppointments(): Promise<SelectedAppointment[]> {
    const queryResult =
      await sql<SelectedAppointment>`SELECT * FROM appointments`;
    return queryResult.rows;
  }

  public async findAllAppointmentsByCustomer(
    customerId: string,
  ): Promise<HistoryAppointment[]> {
    const queryResult = await sql<HistoryAppointment>`
      SELECT appointments.id, appointments.date, appointment_types.name AS type, notes.content as notes
      FROM appointments
      LEFT JOIN appointment_types ON appointment_types.id = appointments.appointment_type_id
      LEFT JOIN notes ON notes.appointment_id = appointments.id
      WHERE customer_id = ${customerId}
      ORDER BY appointments.date DESC
    `;
    return queryResult.rows;
  }

  public async findAllAppointmentsByDate({
    day,
    month,
    year,
  }: FindAllAppointmentsByDatePayload): Promise<Appointment[]> {
    return prisma.appointment.findMany({
      include: {
        appointmentType: true,
        customer: true,
        payments: true,
      },
      where: {
        date: {
          lte: new Date(`${year}-${month}-${day} 23:59:59`),
          gte: new Date(`${year}-${month}-${day} 00:00:00`),
        },
      },
    });
  }

  public async findAllUpcomingAppointments(): Promise<UpcomingAppointment[]> {
    const queryResult = await sql<UpcomingAppointment>`
      SELECT
        appointments.id,
        appointments.date,
        appointment_types.name AS appointment_type_name,
        appointment_types.session_count,
        customers.name AS client_name
      FROM appointments
      LEFT JOIN appointment_types ON appointment_types.id = appointments.appointment_type_id
      LEFT JOIN customers ON customers.id = appointments.customer_id
      ORDER BY appointments.date
    `;
    return queryResult.rows;
  }

  public async findAppointmentById(id: string): Promise<SelectedAppointment> {
    const queryResult =
      await sql<SelectedAppointment>`SELECT * FROM appointments WHERE id = ${id}`;
    return queryResult.rows[0];
  }
}
