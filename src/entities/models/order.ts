import { z } from 'zod';
import {
  OrderStatus,
  PaymentStatus,
  ProductType,
} from '@/src/application/repositories/orders.repository.interface';

export const selectedOrderSchema = z.object({
  id: z.string(),
  customer_id: z.string(),
  customer_name: z.string(),
  date: z.string(),
  order_status: z.string(),
  payment_status: z.string(),
  product_id: z.string(),
  product_type: z.string(),
});

export const createdOrderSchema = z.object({
  id: z.string(),
  customer_id: z.string(),
  customer_name: z.string(),
  date: z.string(),
  order_status: z.string(),
  payment_status: z.string(),
  product_id: z.string(),
  product_type: z.string(),
});

export type SelectedOrder = z.infer<typeof selectedOrderSchema>;
export type CreatedOrder = z.infer<typeof createdOrderSchema>;
export type UpdatedOrder = SelectedOrder;

export class OrderEntity {
  private appointmentIds: string[];
  private customerId: string;
  private date: string;
  private id: string;
  private paymentStatus: PaymentStatus;
  private productId: string;
  private productType: ProductType;
  private orderStatus: OrderStatus;

  constructor(data: CreatedOrder) {
    this.id = data.id;
    this.customerId = data.customer_id;
    this.date = data.date;
    this.orderStatus =
      data.order_status === 'pending' ? 'pending' : 'completed';
    this.paymentStatus = data.payment_status === 'paid' ? 'paid' : 'pending';
    this.productId = data.product_id;
    this.productType = data.product_type === 'care' ? 'care' : 'cure';
    this.appointmentIds = [];
  }

  public addAppointmentId(appointmentId: string): void {
    this.appointmentIds.push(appointmentId);
  }

  public getAppointmentsNumber(): number {
    return this.appointmentIds.length;
  }

  public getCustomerId(): string {
    return this.customerId;
  }

  public getDate(): string {
    return this.date;
  }

  public getId(): string {
    return this.id;
  }

  public getPaymentStatus(): PaymentStatus {
    return this.paymentStatus;
  }

  public getProductId(): string {
    return this.productId;
  }

  public getProductType(): ProductType {
    return this.productType;
  }

  public isCare(): boolean {
    return this.productType === 'care';
  }

  public isCompleted(): boolean {
    return this.orderStatus === 'completed';
  }

  public isCure(): boolean {
    return this.productType === 'cure';
  }

  public isPaid(): boolean {
    return this.paymentStatus === 'paid';
  }
}
