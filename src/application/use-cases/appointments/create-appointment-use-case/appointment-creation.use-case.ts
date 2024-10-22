import { IPaymentsRepository } from '@/src/application/repositories/payments.repository.interface';
import {
  CreatePackagePayload,
  IPackagesRepository,
} from '@/src/application/repositories/packages.repository.interface';
import { IAppointmentTypesRepository } from '@/src/application/repositories/appointment-types.repository.interface';
import {
  CreateAppointmentPayload,
  IAppointmentsRepository,
} from '@/src/application/repositories/appointments.repository.interface';
import { PackageModel } from '@/src/entities/models/package-model';
import { RemainingSessionsDecreaseUseCase } from '../../packages/decrease-remaining-sessions.use-case';
import { formatDateTimeForPayload } from './format-date-time';
import { AppointmentAndPaymentCreationUseCase } from './create-appointment-and-payment.use-case';
import { PackageFindByIdUseCase } from '../../packages/find-package-by-id.use-case';

export class AppointmentCreationUseCase {
  constructor(
    private appointmentsRepository: IAppointmentsRepository,
    private appointmentTypesRepository: IAppointmentTypesRepository,
    private packagesRepository: IPackagesRepository,
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async create(payload: CreateAppointmentPayload, userId: string) {
    if (!payload.is_package) {
      return this.createAppointmentWithReturn(payload, userId);
    }

    if (payload.package_id) {
      return this.createAppointmentWithExistingPackage(
        payload.package_id,
        payload,
        userId,
      );
    }

    return this.createAppointmentAndPackage(payload, userId);
  }

  private async createAppointmentAndPackage(
    payload: CreateAppointmentPayload,
    userId: string,
  ) {
    const appointmentType = await this.findAppointmentTypeById(
      payload.appointment_type_id,
    );

    const startedPackage = await this.createPackage(
      {
        appointment_type_id: payload.appointment_type_id,
        customer_id: payload.customer_id,
        remaining_sessions: appointmentType.session_count - 1,
        start_date: new Date(payload.date).toISOString(),
      },
      userId,
    );
    return this.createAppointmentWithReturn(
      {
        ...payload,
        package_id: startedPackage?.id,
      },
      userId,
    );
  }

  private async createAppointmentWithExistingPackage(
    packageId: string,
    payload: CreateAppointmentPayload,
    userId: string,
  ) {
    const existingPackage = await new PackageFindByIdUseCase(
      this.packagesRepository,
    ).find(packageId);
    if (existingPackage?.hasRemainingSessions()) {
      await this.decreaseRemainingSessions(existingPackage);
      return this.createAppointmentWithReturn(
        {
          ...payload,
          package_id: existingPackage.getId(),
        },
        userId,
      );
    }
  }

  private async createAppointmentWithReturn(
    payload: CreateAppointmentPayload,
    userId: string,
  ) {
    const createdAppointment = await this.createAppointmentAndPayment(
      payload,
      userId,
    );
    return {
      ...createdAppointment,
      ...formatDateTimeForPayload(createdAppointment?.date),
    };
  }

  private createAppointmentAndPayment(
    payload: CreateAppointmentPayload,
    userId: string,
  ) {
    return new AppointmentAndPaymentCreationUseCase(
      this.appointmentsRepository,
      this.paymentsRepository,
    ).create(payload, userId);
  }

  private async createPackage(payload: CreatePackagePayload, userId: string) {
    return this.packagesRepository.create(payload, userId);
  }

  private decreaseRemainingSessions(packageModel: PackageModel) {
    return new RemainingSessionsDecreaseUseCase(
      this.packagesRepository,
    ).decrease(packageModel);
  }

  private async findAppointmentTypeById(appointmentTypeId: string) {
    const appointmentType =
      await this.appointmentTypesRepository.findById(appointmentTypeId);
    if (!appointmentType) {
      throw new Error('Appointment type not found');
    }
    return appointmentType;
  }
}
