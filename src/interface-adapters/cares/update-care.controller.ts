import { CreatedCare } from '@/src/entities/models/care';
import { updateCareUseCase } from '@/src/application/use-cases/cares/update-care.use-case';
import { parseCareForm } from './helpers';

export async function updateCareController(
  careId: string,
  input: any,
): Promise<CreatedCare> {
  const data = parseCareForm(input);
  return updateCareUseCase({
    amount: data.amount,
    categoryId: data.category,
    duration: data.duration,
    id: careId,
    name: data.name,
  });
}
