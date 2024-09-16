import { z } from 'zod';
import {
  CreateOrderPayload,
  PaymentStatus,
  ProductType,
} from '@/src/application/repositories/orders.repository.interface';
import { InputParseError } from '@/src/entities/errors/common';

const inputSchema = z.object({
  customer: z.string().min(1, { message: 'Please select a customer.' }),
  payment_status: z
    .string()
    .min(1, { message: 'Please select a payment status.' }),
  product_id: z.string().min(1, { message: 'Please select a product.' }),
  product_type: z.string().min(1, { message: 'Please select a product type.' }),
});

export function parseOrderForm(input: any): CreateOrderPayload {
  const { data, error: inputParseError } = inputSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError(
      'Please fill all the missing fields.',
      inputParseError,
    );
  }
  return {
    customerId: data.customer,
    date: getDate(),
    orderStatus: 'pending',
    paymentStatus: data.payment_status as PaymentStatus,
    productId: data.product_id,
    productType: data.product_type as ProductType,
  };
}

function getDate() {
  return new Date().toISOString().split('T')[0];
}
