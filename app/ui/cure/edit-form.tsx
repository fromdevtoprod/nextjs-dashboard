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
import AmountInput from '../amount-input';
import NameInput from '../name-input';
import FormErrorMessage from '../form-error-message';

const initialState = { message: null, error: {} };

export default function Form({ cares, cure }: { cares: Care[]; cure: Cure }) {
  const [isSecondCareDisplayed, setIsSecondCareDisplayed] = useState(
    !!cure.care_2_id,
  );
  const updateCureWithId = updateCure.bind(null, cure.product_id);
  const [state, formAction] = useActionState(updateCureWithId, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <NameInput
          errors={state.errors?.name || []}
          value={cure.product_name}
        />

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
              selectedCare={cure.care_2_id}
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

        <AmountInput
          errors={state.errors?.amount || []}
          value={cure.product_amount}
        />
        <FormErrorMessage message={state.message} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/cure" />
        <Button type="submit">Update Cure</Button>
      </div>
    </form>
  );
}
