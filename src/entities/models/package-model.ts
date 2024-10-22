import { AppointmentType } from './appointment-types';
import { Customer } from './customer';

export type Package = {
  id: string;
  appointmentType: AppointmentType;
  appointmentTypeId: string;
  customer: Customer;
  customerId: string;
  remaining_sessions: number;
  start_date: Date;
};

export class PackageModel {
  constructor(private packageInit: Package) {}

  public decreaseRemainingSessions(): number {
    if (!this.hasRemainingSessions()) return 0;
    return --this.packageInit.remaining_sessions;
  }

  public getId(): string {
    return this.packageInit.id;
  }

  public getRemainingSessions(): number {
    return this.packageInit.remaining_sessions;
  }

  public hasRemainingSessions(): boolean {
    return this.packageInit.remaining_sessions > 0;
  }
}
