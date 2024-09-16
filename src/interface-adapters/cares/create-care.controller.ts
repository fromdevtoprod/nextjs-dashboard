import { createCareUseCase } from '@/src/application/use-cases/cares/create-care.use-case';
import { CreatedCare } from '@/src/entities/models/care';
import { parseCareForm } from './helpers';

export async function createCareController(input: any): Promise<CreatedCare> {
  const data = parseCareForm(input);
  return createCareUseCase({
    amount: data.amount,
    categoryId: data.category,
    duration: data.duration,
    name: data.name,
  });
}
