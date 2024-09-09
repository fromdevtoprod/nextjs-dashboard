'use client';

import { useState } from 'react';
import { CustomerField } from '@/app/lib/definitions';
import { SelectCustomerModal } from './select-customer-modal';
import { AddButton } from '../buttons/add-button';

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
      <AddButton
        label="Book appointment"
        onClick={() => setIsModalDisplayed(true)}
      />
    </form>
  );
}
