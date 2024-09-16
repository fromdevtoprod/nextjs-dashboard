import { updateCureUseCase } from '@/src/application/use-cases/cures/update-cure.use-case';
import { CreatedCure } from '@/src/entities/models/cure';
import { parseCureForm } from './helpers';

export async function updateCureController(
  cureId: string,
  input: any,
): Promise<CreatedCure> {
  const data = parseCureForm(input);
  return updateCureUseCase({
    amount: data.amount,
    care_1_id: data.care_1,
    care_1_session_number: data.session_number_1,
    care_2_id: data.care_2 || null,
    care_2_session_number: data.session_number_2 || 0,
    id: cureId,
    name: data.name,
  });
}
