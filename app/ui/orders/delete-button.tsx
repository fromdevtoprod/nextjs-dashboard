'use client';

import { useState } from 'react';
import { deleteOrder } from '@/app/lib/actions/orders';
import DeleteConfirmationModal from '../delete-confirmation-modal';
import { DeleteButton } from '../buttons/delete-button';

export function DeleteOrderButton({ orderId }: { orderId: string }) {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  const deleteOrderWithId = deleteOrder.bind(null, orderId);
  return (
    <form>
      {isModalDisplayed && (
        <DeleteConfirmationModal
          item="order"
          onConfirmation={() => deleteOrderWithId()}
          onCancel={() => setIsModalDisplayed(false)}
        />
      )}
      <DeleteButton onClick={() => setIsModalDisplayed(true)} />
    </form>
  );
}
