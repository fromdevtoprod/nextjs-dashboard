import { z } from 'zod';
import { InputParseError } from '@/src/entities/errors/common';
import { CreatedCare } from '@/src/entities/models/care';
import { updateCareUseCase } from '@/src/application/use-cases/cares/update-care.use-case';

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

export async function updateCareController(
  productId: string,
  input: any,
): Promise<CreatedCare> {
  const { data, error: inputParseError } = inputSchema.safeParse(input);
  if (inputParseError) {
    throw new InputParseError(
      'Please fill all the missing fields.',
      inputParseError,
    );
  }
  return updateCareUseCase(productId, data);
}
