'use client';

// @ts-ignore
import { useActionState } from 'react';
import { createCustomer } from '@/app/lib/actions/customers';
import { Button } from '../button';
import CancelButton from '../cancel-button';
import NameInput from '../name-input';
import EmailInput from '../email-input';
import PhoneInput from '../phone-input';
import BirthDateInput from '../birthdate-input';
import PathologyTextarea from '../pathology-textarea';
import FormErrorMessage from '../form-error-message';

export function CreateCustomerForm() {
  const initialState = { message: null, error: {} };
  const [state, formAction] = useActionState(createCustomer, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <NameInput
          errors={state.errors?.name || []}
          placeholder="M. John Doe"
        />
        <EmailInput errors={state.errors?.email || []} />
        <PhoneInput errors={state.errors?.phone || []} />
        <BirthDateInput errors={state.errors?.birth_date || []} />
        <PathologyTextarea errors={state.errors?.pathology || []} />
        <FormErrorMessage message={state.message} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/customers" />
        <Button type="submit">Create Customer</Button>
      </div>
    </form>
  );
}
