import { z, ZodError } from 'zod';
import { InputParseError } from '@/src/entities/errors/common';

const inputSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string(),
  phone: z.string(),
  birth_date: z.string().min(1, { message: 'Birth date is required' }),
  pathology: z.string(),
});

export function parseCustomerForm(input: any) {
  const { data, error: inputParseError } = inputSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError(
      'Please fill all the missing fields.',
      inputParseError,
    );
  }
  if (!hasEmailOrPhone(data.email, data.phone)) {
    throw getEmailOrPhoneError();
  }
  return data;
}

function hasEmailOrPhone(email: string, phone: string) {
  return email !== '' || phone !== '';
}

function getEmailOrPhoneError() {
  return new InputParseError(
    'Please fill all the missing fields.',
    new ZodError([
      {
        code: 'custom',
        message: 'Email or phone is required',
        path: ['email'],
      },
    ]),
  );
}

export function formatBirthDate(birthDate: string) {
  const [day, month, year] = birthDate.split('/');
  return `${year}-${month}-${day}`;
}
