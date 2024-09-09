'use client';

// @ts-ignore
import { useActionState, useState } from 'react';
import { createCure } from '@/app/lib/actions/cure';
import { CareShortDescription } from '@/app/lib/definitions';
import { CureDetails } from './cure-details';
import AddCareButton from './add-care-button';
import RemoveCareButton from './remove-care-button';
import CancelButton from '../cancel-button';
import AmountInput from '../amount-input';
import { Button } from '../button';
import NameInput from '../name-input';
import FormErrorMessage from '../form-error-message';

const initialState = { message: null, error: {} };

export function CreateCureForm({ cares }: { cares: CareShortDescription[] }) {
  const [isSecondCareDisplayed, setIsSecondCareDisplayed] = useState(false);
  const [state, formAction] = useActionState(createCure, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <NameInput errors={state.errors?.name || []} />

        {/* Cure care */}
        <div className="mb-4">
          <CureDetails
            cares={cares}
            position={1}
            errors={{
              care: state.errors?.care_1 || [],
              session_number: state.errors?.session_number_1 || [],
            }}
          />
          {isSecondCareDisplayed && (
            <CureDetails
              cares={cares}
              position={2}
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

        <AmountInput errors={state.errors?.amount || []} />
        <FormErrorMessage message={state.message} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/cure" />
        <Button type="submit">Create Cure</Button>
      </div>
    </form>
  );
}
