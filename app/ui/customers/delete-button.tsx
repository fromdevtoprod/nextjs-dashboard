'use client';

import { useState } from 'react';
import { deleteCustomer } from '@/app/lib/actions/customers';
import DeleteConfirmationModal from '../delete-confirmation-modal';
import { DeleteButton } from '../buttons/delete-button';

export default function DeleteCustomerButton({ id }: { id: string }) {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const deleteCustomerWithId = deleteCustomer.bind(null, id);
  return (
    <form>
      {isModalDisplayed && (
        <DeleteConfirmationModal
          item="customer"
          onConfirmation={() => deleteCustomerWithId()}
          onCancel={() => setIsModalDisplayed(false)}
        />
      )}
      <DeleteButton onClick={() => setIsModalDisplayed(true)} />
    </form>
  );
}
