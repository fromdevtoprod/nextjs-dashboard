'use client';

import { useState } from 'react';
import { deleteCure } from '@/app/lib/actions/cure';
import DeleteConfirmationModal from '../delete-confirmation-modal';
import { DeleteButton } from '../buttons/delete-button';

export default function DeleteCureButton({ id }: { id: string }) {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const deleteCureWithId = deleteCure.bind(null, id);
  return (
    <form>
      {isModalDisplayed && (
        <DeleteConfirmationModal
          item="cure"
          onConfirmation={() => deleteCureWithId()}
          onCancel={() => setIsModalDisplayed(false)}
        />
      )}
      <DeleteButton onClick={() => setIsModalDisplayed(true)} />
    </form>
  );
}
