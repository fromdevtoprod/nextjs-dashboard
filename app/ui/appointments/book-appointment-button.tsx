'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { CustomerField } from '@/app/lib/definitions';
import { SelectCustomerModal } from './select-customer-modal';

export function BookAppointmentButton({
  customers,
  date,
}: {
  customers: CustomerField[];
  date: string;
}) {
  const [isModalDisplayed, setIsModalDisplayed] = useState(false);
  return (
    <form className="mt-6 flex justify-center">
      {isModalDisplayed && (
        <SelectCustomerModal
          customers={customers}
          date={date}
          onAction={() => {
            setIsModalDisplayed(false);
          }}
          onCancel={() => setIsModalDisplayed(false)}
        />
      )}
      <button
        type="button"
        className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        onClick={() => setIsModalDisplayed(true)}
      >
        <span className="hidden md:block">Book Appointment</span>{' '}
        <PlusIcon className="h-5 md:ml-4" />
      </button>
    </form>
  );
}
