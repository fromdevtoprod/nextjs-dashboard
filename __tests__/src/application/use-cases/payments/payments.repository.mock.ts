import { IPaymentsRepository } from '@/src/application/repositories/payments.repository.interface';

export class PaymentsRepositoryMock implements IPaymentsRepository {
  public async create(payload: any, userId: string): Promise<any> {
    return;
  }

  public async deletePayment(id: string): Promise<void> {
    return;
  }

  public async deletePaymentByAppointmentId(
    appointmentId: string,
  ): Promise<void> {
    return;
  }

  public async findAll(): Promise<any[]> {
    return [];
  }

  public async findById(id: string): Promise<any | null> {
    return;
  }

  public async updatePayment(payload: any): Promise<any | null> {
    return;
  }
}
