import {
  CreatedAppointmentTypePayload,
  IAppointmentTypesRepository,
  UpdateAppointmentTypePayload,
} from '@/src/application/repositories/appointment-types.repository.interface';
import { AppointmentType } from '@/src/entities/models/appointment-types';
import { prisma } from '@/prisma';

export class AppointmentTypesRepository implements IAppointmentTypesRepository {
  public async create(
    payload: CreatedAppointmentTypePayload,
  ): Promise<AppointmentType> {
    return prisma.appointmentType.create({
      data: {
        duration: payload.duration,
        name: payload.name,
        price: payload.price,
        session_count: payload.sessionCount,
      },
    });
  }

  public async delete(id: string): Promise<void> {
    await prisma.appointmentType.delete({
      where: {
        id,
      },
    });
  }

  public async findAll(): Promise<AppointmentType[]> {
    return prisma.appointmentType.findMany();
  }

  public async findById(id: string): Promise<AppointmentType | null> {
    return prisma.appointmentType.findUnique({
      where: {
        id,
      },
    });
  }

  public async findBySessionCountMin(
    sessionCountMin: number,
  ): Promise<AppointmentType[]> {
    return prisma.appointmentType.findMany({
      where: {
        session_count: {
          gte: sessionCountMin,
        },
      },
    });
  }

  public async update(
    payload: UpdateAppointmentTypePayload,
  ): Promise<AppointmentType> {
    return prisma.appointmentType.update({
      where: {
        id: payload.id,
      },
      data: {
        duration: payload.duration,
        name: payload.name,
        price: payload.price,
        session_count: payload.sessionCount,
      },
    });
  }
}
