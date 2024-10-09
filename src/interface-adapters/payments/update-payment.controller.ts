import { z } from 'zod';

const FormSchema = z.object({
  method: z.string(),
  status: z.string(),
});

export function updatePaymentController(id: string, formData: FormData) {
  const { method, status } = FormSchema.parse({
    method: formData.get('method'),
    status: formData.get('status'),
  });

  if (!method || !status) {
    throw new Error('All fields are required.');
  }

  return {
    id,
    method,
    status,
  };
}
