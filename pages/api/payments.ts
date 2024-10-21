import { NextApiRequest, NextApiResponse } from 'next';
import { Payment } from '@/src/entities/models/payment';
import {
  CreatePaymentPayload,
  UpdatePaymentPayload,
} from '@/src/application/repositories/payments.repository.interface';
import { createPaymentUseCase } from '@/src/application/use-cases/payments/create-payment.use-case';
import { updatePaymentUseCase } from '@/src/application/use-cases/payments/update-payment.use-case';
import { deletePaymentUseCase } from '@/src/application/use-cases/payments/delete-payment.use-case';

export type CreatePaymentResponse = {
  message: string;
  createdPayment: Payment;
};

export type UpdatePaymentResponse = {
  message: string;
  updatedPayment: Payment;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const {
      amount,
      appointmentId,
      customerId,
      date,
      packageId,
      status,
      method,
      userEmail,
    } = req.body;

    if (
      !amount ||
      !appointmentId ||
      !customerId ||
      !date ||
      !packageId ||
      !status ||
      !method
    ) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!userEmail) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const newPayment: CreatePaymentPayload = {
      amount,
      appointmentId,
      customerId,
      date,
      packageId,
      status,
      method,
    };

    try {
      const createdPayment = await createPaymentUseCase(newPayment, userEmail);
      return res.status(201).json({
        message: 'Payment created successfully',
        createdPayment,
      } as CreatePaymentResponse);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not create this payment.',
      });
    }
  } else if (req.method === 'PUT') {
    const { id, method, status } = req.body as UpdatePaymentPayload;

    if (!id || !method || !status) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const payload: UpdatePaymentPayload = {
      id,
      status,
      method,
    };

    const updatedPayment = await updatePaymentUseCase(payload);

    return res.status(201).json({
      message: 'Payment updated successfully',
      updatedPayment,
    } as UpdatePaymentResponse);
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: 'Id is required.' });
    }

    try {
      await deletePaymentUseCase(id);
      return res.status(201).json({
        message: 'Payment deleted successfully',
        paymentId: id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'We could not delete this payment.',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
