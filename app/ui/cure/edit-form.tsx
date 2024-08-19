'use client';

// @ts-ignore
import { useActionState, useState } from 'react';
import { Button } from '../button';
import { updateCure } from '@/app/lib/actions/cure';
import { Care, Cure } from '@/app/lib/definitions';
import CureDetails from './cure-details';
import AddCareButton from './add-care-button';
import RemoveCareButton from './remove-care-button';
import CancelButton from '../cancel-button';
import SelectStatus from '../select-status';
import AmountInput from '../amount-input';
import NameInput from '../name-input';
import FormErrorMessage from '../form-error-message';

const initialState = { message: null, error: {} };

export default function Form({ cares, cure }: { cares: Care[]; cure: Cure }) {
  const [isSecondCareDisplayed, setIsSecondCareDisplayed] = useState(
    !!cure.care_id_2,
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
            selectedCare={cure.care_id_1}
            sessionNumber={cure.session_number_1}
            errors={{
              care: state.errors?.care_1 || [],
              session_number: state.errors?.session_number_1 || [],
            }}
          />
          {isSecondCareDisplayed && (
            <CureDetails
              cares={cares}
              position={2}
              selectedCare={cure.care_id_2}
              sessionNumber={cure.session_number_2}
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
        <SelectStatus value={cure.status} />
        <FormErrorMessage message={state.message} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/cure" />
        <Button type="submit">Update Cure</Button>
      </div>
    </form>
  );
}
