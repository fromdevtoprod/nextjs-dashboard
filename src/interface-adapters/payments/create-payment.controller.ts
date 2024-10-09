import { z } from 'zod';

const FormSchema = z.object({
  amount: z.string(),
  appointmentId: z.string(),
  customerId: z.string(),
  date: z.string(),
  method: z.string(),
  packageId: z.string(),
  status: z.string(),
});

export function createPaymentController(formData: FormData) {
  const { amount, appointmentId, customerId, date, method, packageId, status } =
    FormSchema.parse({
      amount: formData.get('amount'),
      appointmentId: formData.get('appointmentId'),
      customerId: formData.get('customerId'),
      date: formData.get('date'),
      method: formData.get('method'),
      packageId: formData.get('packageId'),
      status: formData.get('status'),
    });

  if (
    !amount ||
    !appointmentId ||
    !customerId ||
    !date ||
    !method ||
    !packageId ||
    !status
  ) {
    throw new Error('All fields are required.');
  }

  return {
    amount,
    appointmentId,
    customerId,
    date,
    method,
    packageId,
    status,
  };
}
