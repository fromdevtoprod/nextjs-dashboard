'use client';

// @ts-ignore
import { useActionState } from 'react';
import { createCare } from '@/app/lib/actions/care';
import { CareCategory } from '@/app/lib/definitions';
import { Button } from '../button';
import CancelButton from '../cancel-button';
import AmountInput from '../amount-input';
import NameInput from '../name-input';
import DurationInput from '../duration-input';
import SelectCategory from '../select-category';
import FormErrorMessage from '../form-error-message';

const initialState = { message: null, error: {} };

export default function Form({ categories }: { categories: CareCategory[] }) {
  const [state, formAction] = useActionState(createCare, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <SelectCategory categories={categories} />
        <NameInput errors={state.errors?.name || []} />
        <AmountInput errors={state.errors?.amount || []} />
        <DurationInput errors={state.errors?.duration || []} />
        <FormErrorMessage message={state.message} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/care" />
        <Button type="submit">Create Care</Button>
      </div>
    </form>
  );
}
