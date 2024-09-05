'use client';

import { useState } from 'react';
import { deleteAppointment } from '@/app/lib/actions/appointments';
import DeleteConfirmationModal from '../delete-confirmation-modal';
import { DeleteButton } from '../buttons/delete-button';

export function DeleteAppointmentButton({ id }: { id: string }) {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const deleteAppointmentWithId = deleteAppointment.bind(null, id);
  return (
    <form>
      {isModalDisplayed && (
        <DeleteConfirmationModal
          item="care"
          onConfirmation={() => deleteAppointmentWithId()}
          onCancel={() => setIsModalDisplayed(false)}
        />
      )}
      <DeleteButton onClick={() => setIsModalDisplayed(true)} />
    </form>
  );
}
