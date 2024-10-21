import {
  CreatePackagePayload,
  IPackagesRepository,
  UpdatePackagePayload,
} from '@/src/application/repositories/packages.repository.interface';
import { Package } from '@/src/entities/models/package-model';
import { prisma } from '@/prisma';

export class PackagesRepository implements IPackagesRepository {
  public async countCompletedSessions(userId: string): Promise<number> {
    return prisma.package.count({
      where: {
        remaining_sessions: 0,
        start_date: {
          gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30),
        },
        userId,
      },
    });
  }

  public async create(
    payload: CreatePackagePayload,
    userId: string,
  ): Promise<Package | null> {
    const startedPackage = prisma.package.create({
      data: {
        appointmentTypeId: payload.appointment_type_id,
        customerId: payload.customer_id,
        remaining_sessions: payload.remaining_sessions,
        start_date: new Date(payload.start_date),
        userId,
      },
    });
    return this.findById((await startedPackage).id);
  }

  public async delete(id: string): Promise<void> {
    await prisma.package.delete({
      where: {
        id,
      },
    });
  }

  public async deleteByAppointmentTypeId(
    appointmentTypeId: string,
  ): Promise<void> {
    await prisma.package.deleteMany({
      where: {
        appointmentTypeId,
      },
    });
  }

  public async deleteByCustomerId(customerId: string): Promise<void> {
    await prisma.package.deleteMany({
      where: {
        customerId,
      },
    });
  }

  public async findAll(userId: string): Promise<Package[]> {
    return prisma.package.findMany({
      include: {
        appointmentType: true,
        customer: true,
      },
      where: {
        userId,
      },
    });
  }

  public async findById(id: string): Promise<Package | null> {
    return prisma.package.findUnique({
      include: {
        appointmentType: true,
        customer: true,
      },
      where: {
        id,
      },
    });
  }

  public async findAllUncompletedPackages(): Promise<Package[]> {
    return prisma.package.findMany({
      where: {
        remaining_sessions: {
          gt: 0,
        },
      },
      include: {
        appointmentType: true,
        customer: true,
      },
    });
  }

  public async findExistingPackage(
    customer_id: string,
    appointment_type_id: string,
  ): Promise<Package | null> {
    return prisma.package.findFirst({
      where: {
        customerId: customer_id,
        appointmentTypeId: appointment_type_id,
        remaining_sessions: {
          gt: 0,
        },
      },
      include: {
        appointmentType: true,
        customer: true,
      },
    });
  }

  public async updateRemainingSessions(
    payload: UpdatePackagePayload,
  ): Promise<Package | null> {
    await prisma.package.update({
      where: {
        id: payload.id,
      },
      data: {
        remaining_sessions: payload.remaining_sessions,
      },
    });
    return this.findById(payload.id);
  }
}
