'use client';

import { useState } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import DeleteConfirmationModal from '../delete-confirmation-modal';
import { deleteCure } from '@/app/lib/actions/cure';

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
      <button
        type="button"
        className="rounded-md border-0 bg-red-500 p-2 hover:bg-red-100"
        onClick={() => setIsModalDisplayed(true)}
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-white" />
      </button>
    </form>
  );
}
