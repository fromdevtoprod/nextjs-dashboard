import { z } from 'zod';

export const selectedAppointmentSchema = z.object({
  id: z.string(),
  care_id: z.string(),
  care_name: z.string(),
  customer_id: z.string(),
  customer_name: z.string(),
  date: z.string(),
  end_date: z.string(),
  payment_status: z.string(),
  order_id: z.string(),
});

export const createdAppointmentSchema = z.object({
  id: z.string(),
  care_id: z.string(),
  date: z.string(),
  end_date: z.string(),
  order_id: z.string(),
});

export type SelectedAppointment = z.infer<typeof selectedAppointmentSchema>;
export type CreatedAppointment = z.infer<typeof createdAppointmentSchema>;
export type UpdatedAppointment = SelectedAppointment;

export class AppointmentEntity {
  private id: string;
  private careId: string;
  private date: string;
  private endDate: string;
  private orderId: string;

  constructor(data: CreatedAppointment | SelectedAppointment) {
    this.id = data.id;
    this.careId = data.care_id;
    this.date = data.date;
    this.endDate = data.end_date;
    this.orderId = data.order_id;
  }

  public getCareId(): string {
    return this.careId;
  }

  public getDate(): string {
    return this.date;
  }

  public getEndDate(): string {
    return this.endDate;
  }

  public getId(): string {
    return this.id;
  }

  public getOrderId(): string {
    return this.orderId;
  }
}
