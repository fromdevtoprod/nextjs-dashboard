import {
  CreatePaymentPayload,
  IPaymentsRepository,
} from '@/src/application/repositories/payments.repository.interface';
import {
  CreateAppointmentPayload,
  IAppointmentsRepository,
} from '../../../repositories/appointments.repository.interface';
import { PaymentCreationUseCase } from '../../payments/create-payment.use-case';

export class AppointmentAndPaymentCreationUseCase {
  constructor(
    private appointmentsRepository: IAppointmentsRepository,
    private paymentsRepository: IPaymentsRepository,
  ) {}

  public async create(payload: CreateAppointmentPayload, userId: string) {
    const createdAppointment = await this.createAppointmentWithUserId(
      payload,
      userId,
    );
    try {
      await this.createPayment(
        {
          amount: `${createdAppointment?.appointmentType.price}`,
          appointmentId: createdAppointment?.id || '',
          customerId: payload.customer_id,
          date: createdAppointment?.date.toISOString() || '',
          packageId: payload.package_id,
          status: payload.payment.status,
          method: payload.payment.method,
        },
        userId,
      );
    } catch (error) {
      if (createdAppointment?.id) {
        await this.deleteAppointment(createdAppointment.id);
      }
      throw error;
    }
    return createdAppointment;
  }

  private createAppointmentWithUserId(
    payload: CreateAppointmentPayload,
    userId: string,
  ) {
    return this.appointmentsRepository.createAppointment(payload, userId);
  }

  private createPayment(payload: CreatePaymentPayload, userId: string) {
    return new PaymentCreationUseCase(this.paymentsRepository).create(
      payload,
      userId,
    );
  }

  private deleteAppointment(appointmentId: string) {
    return this.appointmentsRepository.deleteAppointment(appointmentId);
  }
}
