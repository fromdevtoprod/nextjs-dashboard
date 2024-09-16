import { createCureUseCase } from '@/src/application/use-cases/cures/create-cure.use-case';
import { InputParseError } from '@/src/entities/errors/common';
import { CreatedCure } from '@/src/entities/models/cure';
import { z } from 'zod';

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

export async function createCureController(input: any): Promise<CreatedCure> {
  const { data, error: inputParseError } = inputSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError(
      'Please fill all the missing fields.',
      inputParseError,
    );
  }
  return createCureUseCase({
    amount: data.amount,
    care_1_id: data.care_1,
    care_1_session_number: data.session_number_1,
    care_2_id: data.care_2 || null,
    care_2_session_number: data.session_number_2 || 0,
    name: data.name,
  });
}
