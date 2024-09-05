'use client';

import { useState } from 'react';
import { deleteCare } from '@/app/lib/actions/care';
import DeleteConfirmationModal from '../delete-confirmation-modal';
import { DeleteButton } from '../buttons/delete-button';

export default function DeleteCareButton({ id }: { id: string }) {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const deleteCareWithId = deleteCare.bind(null, id);
  return (
    <form>
      {isModalDisplayed && (
        <DeleteConfirmationModal
          item="care"
          onConfirmation={() => deleteCareWithId()}
          onCancel={() => setIsModalDisplayed(false)}
        />
      )}
      <DeleteButton onClick={() => setIsModalDisplayed(true)} />
    </form>
  );
}
