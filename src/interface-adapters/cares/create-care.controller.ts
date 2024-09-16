import { z } from 'zod';
import { createCareUseCase } from '@/src/application/use-cases/cares/create-care.use-case';
import { InputParseError } from '@/src/entities/errors/common';
import { CreatedCare } from '@/src/entities/models/care';

const inputSchema = z.object({
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than 0€.' }),
  category: z.string().min(1, { message: 'Category is required' }),
  duration: z.coerce
    .number()
    .gt(0, { message: 'Please enter a duration greater than 0.' }),
  name: z.string().min(1, { message: 'Name is required' }),
});

export async function createCareController(input: any): Promise<CreatedCare> {
  const { data, error: inputParseError } = inputSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError(
      'Please fill all the missing fields.',
      inputParseError,
    );
  }
  return createCareUseCase({
    amount: data.amount,
    categoryId: data.category,
    duration: data.duration,
    name: data.name,
  });
}
