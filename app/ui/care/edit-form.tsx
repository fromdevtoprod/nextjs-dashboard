'use client';

// @ts-ignore
import { useActionState } from 'react';
import { Button } from '../button';
import { updateCare } from '@/app/lib/actions/care';
import { Care, CareCategory } from '@/app/lib/definitions';
import CancelButton from '../cancel-button';
import SelectStatus from '../select-status';
import AmountInput from '../amount-input';
import NameInput from '../name-input';
import DurationInput from '../duration-input';
import SelectCategory from '../select-category';
import FormErrorMessage from '../form-error-message';

const initialState = { message: null, error: {} };

export default function Form({
  care,
  categories,
}: {
  care: Care;
  categories: CareCategory[];
}) {
  const updateCareWithId = updateCare.bind(null, care.product_id);
  const [state, formAction] = useActionState(updateCareWithId, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <SelectCategory categories={categories} value={care.category_id} />
        <NameInput
          errors={state.errors?.name || []}
          value={care.product_name}
        />
        <AmountInput
          errors={state.errors?.amount || []}
          value={care.product_amount}
        />
        <DurationInput
          errors={state.errors?.duration || []}
          value={care.duration}
        />
        <FormErrorMessage message={state.message} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/care" />
        <Button type="submit">Update Care</Button>
      </div>
    </form>
  );
}
