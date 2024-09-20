'use client';

// @ts-ignore
import { useActionState } from 'react';
import { updateCustomer } from '@/app/lib/actions/customers';
import { SelectedCustomer } from '@/src/entities/models/customer';
import { Button } from '../button';
import CancelButton from '../buttons/cancel-button';
import NameInput from '../name-input';
import EmailInput from '../email-input';
import PhoneInput from '../phone-input';
import BirthDateInput from '../birthdate-input';
import PathologyTextarea from '../pathology-textarea';
import FormErrorMessage from '../form-error-message';

export function EditCustomerForm({ customer }: { customer: SelectedCustomer }) {
  const initialState = { message: null, error: {} };
  const updateCustomerWithId = updateCustomer.bind(null, customer.id);
  const [state, formAction] = useActionState(
    updateCustomerWithId,
    initialState,
  );
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <NameInput errors={state.errors?.name || []} value={customer.name} />
        <EmailInput errors={state.errors?.email || []} value={customer.email} />
        <PhoneInput errors={state.errors?.phone || []} value={customer.phone} />
        <BirthDateInput
          errors={state.errors?.birth_date || []}
          value={customer.birthDate}
        />
        <PathologyTextarea
          errors={state.errors?.pathology || []}
          value={customer.pathology}
        />
        <FormErrorMessage message={state.message} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/customers" />
        <Button type="submit">Update Customer</Button>
      </div>
    </form>
  );
}
