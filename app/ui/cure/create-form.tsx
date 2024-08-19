'use client';

// @ts-ignore
import { useActionState, useState } from 'react';
import { CurrencyEuroIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createCure } from '@/app/lib/actions/cure';
import { Care } from '@/app/lib/definitions';
import CureDetails from './cure-details';
import AddCareButton from './add-care-button';
import RemoveCareButton from './remove-care-button';
import CancelButton from '../cancel-button';
import SelectStatus from '../select-status';

const initialState = { message: null, error: {} };

export default function Form({ cares }: { cares: Care[] }) {
  const [isSecondCareDisplayed, setIsSecondCareDisplayed] = useState(false);
  const [state, formAction] = useActionState(createCure, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Cure name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Enter a name for this cure
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter a name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

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

        {/* Cure amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Enter an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                placeholder="Enter an amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
              />
              <CurrencyEuroIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <SelectStatus />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/cure" />
        <Button type="submit">Create Cure</Button>
      </div>
    </form>
  );
}
