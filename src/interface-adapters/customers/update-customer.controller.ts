import { z } from 'zod';

const FormSchema = z.object({
  birthDate: z.string(),
  email: z.string(),
  name: z.string(),
  pathology: z.string(),
  phone: z.string(),
});

export function updateCustomerController(id: string, formData: FormData) {
  const { name, email, phone, birthDate, pathology } = FormSchema.parse({
    name: formData.get('name'),
    email: formData.get('email') || '',
    phone: formData.get('phone') || '',
    birthDate: formData.get('birthDate'),
    pathology: formData.get('pathology') || '',
  });

  if (email === '' && phone === '') {
    throw new Error('Email or phone is required.');
  }

  return {
    birthDate,
    email,
    id,
    name,
    pathology,
    phone,
  };
}
