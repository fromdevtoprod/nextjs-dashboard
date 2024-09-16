import { z, ZodError } from 'zod';
import { InputParseError } from '@/src/entities/errors/common';
import { CreatedCustomer } from '@/src/entities/models/customer';
import { createCustomerUseCase } from '@/src/application/use-cases/customers/create-customer.use-case';

const inputSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string(),
  phone: z.string(),
  birth_date: z.string().min(1, { message: 'Birth date is required' }),
  pathology: z.string(),
});

export async function createCustomerController(
  input: any,
): Promise<CreatedCustomer> {
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

  return createCustomerUseCase({
    name: data.name,
    email: data.email,
    phone: data.phone,
    birthDate: formatBirthDate(data.birth_date),
    pathology: data.pathology,
  });
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

function formatBirthDate(birthDate: string) {
  const [day, month, year] = birthDate.split('/');
  return `${year}-${month}-${day}`;
}
