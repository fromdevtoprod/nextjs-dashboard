'use client';

// @ts-ignore
import { useActionState, useState } from 'react';
import { SelectedCare } from '@/src/entities/models/care';
import { SelectedCure } from '@/src/entities/models/cure';
import { updateCure } from '@/app/lib/actions/cure';
import { Button } from '../button';
import { CureDetails } from './cure-details';
import AddCareButton from './add-care-button';
import RemoveCareButton from './remove-care-button';
import CancelButton from '../buttons/cancel-button';
import AmountInput from '../amount-input';
import NameInput from '../name-input';
import FormErrorMessage from '../form-error-message';

const initialState = { message: null, error: {} };

export function EditCureForm({
  cares,
  cure,
}: {
  cares: SelectedCare[];
  cure: SelectedCure;
}) {
  const [isSecondCareDisplayed, setIsSecondCareDisplayed] = useState(
    !!cure.care_2_id,
  );
  const updateCureWithId = updateCure.bind(null, cure.id);
  const [state, formAction] = useActionState(updateCureWithId, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <NameInput errors={state.errors?.name || []} value={cure.name} />

        {/* Cure care */}
        <div className="mb-4">
          <CureDetails
            cares={cares}
            position={1}
            selectedCare={cure.care_1_id}
            sessionNumber={cure.care_1_session_number}
            errors={{
              care: state.errors?.care_1 || [],
              session_number: state.errors?.session_number_1 || [],
            }}
          />
          {isSecondCareDisplayed && (
            <CureDetails
              cares={cares}
              position={2}
              selectedCare={cure.care_2_id || ''}
              sessionNumber={cure.care_2_session_number}
              errors={{
                care: state.errors?.care_2 || [],
                session_number: state.errors?.session_number_2 || [],
              }}
            />
          )}
          {!isSecondCareDisplayed && (
            <AddCareButton onClick={() => setIsSecondCareDisplayed(true)} />
          )}
          {isSecondCareDisplayed && (
            <RemoveCareButton onClick={() => setIsSecondCareDisplayed(false)} />
          )}
        </div>

        <AmountInput errors={state.errors?.amount || []} value={cure.amount} />
        <FormErrorMessage message={state.message} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/cures" />
        <Button type="submit">Update Cure</Button>
      </div>
    </form>
  );
}
