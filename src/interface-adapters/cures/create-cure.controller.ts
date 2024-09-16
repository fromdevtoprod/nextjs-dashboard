import { createCureUseCase } from '@/src/application/use-cases/cures/create-cure.use-case';
import { CreatedCure } from '@/src/entities/models/cure';
import { parseCureForm } from './helpers';

export async function createCureController(input: any): Promise<CreatedCure> {
  const data = parseCureForm(input);
  return createCureUseCase({
    amount: data.amount,
    care_1_id: data.care_1,
    care_1_session_number: data.session_number_1,
    care_2_id: data.care_2 || null,
    care_2_session_number: data.session_number_2 || 0,
    name: data.name,
  });
}
