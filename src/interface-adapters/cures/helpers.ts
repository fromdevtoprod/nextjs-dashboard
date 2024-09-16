import { z } from 'zod';
import { InputParseError } from '@/src/entities/errors/common';

const inputSchema = z.object({
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0€.' }),
  care_1: z.string().min(1, { message: 'Please select a care.' }),
  session_number_1: z.coerce
    .number()
    .gt(0, { message: 'Please enter a session number greater than 0.' }),
  care_2: z.string().optional(),
  session_number_2: z.coerce.number().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
});

export function parseCureForm(input: any) {
  const { data, error: inputParseError } = inputSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError(
      'Please fill all the missing fields.',
      inputParseError,
    );
  }
  return data;
}
