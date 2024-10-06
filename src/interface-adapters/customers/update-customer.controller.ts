import { z } from 'zod';

const FormSchema = z.object({
  address: z.string(),
  birthDate: z.string(),
  city: z.string(),
  email: z.string(),
  name: z.string(),
  pathology: z.string(),
  postalCode: z.string(),
  phone: z.string(),
});

export function updateCustomerController(id: string, formData: FormData) {
  const {
    address,
    birthDate,
    city,
    email,
    name,
    pathology,
    phone,
    postalCode,
  } = FormSchema.parse({
    address: formData.get('address') || '',
    birthDate: formData.get('birthDate'),
    city: formData.get('city') || '',
    email: formData.get('email') || '',
    name: formData.get('name'),
    pathology: formData.get('pathology') || '',
    phone: formData.get('phone') || '',
    postalCode: formData.get('postalCode') || '',
  });

  if (email === '' && phone === '') {
    throw new Error('Email or phone is required.');
  }

  return {
    address,
    birthDate,
    city,
    email,
    id,
    name,
    pathology,
    phone,
    postalCode,
  };
}
