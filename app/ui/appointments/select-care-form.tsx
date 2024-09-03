'use client';

// @ts-ignore
import { useActionState, useState } from 'react';
import { createAppointment } from '@/app/lib/actions/appointments';
import { Care, CustomerField } from '@/app/lib/definitions';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { Button } from '../button';
import CancelButton from '../cancel-button';
import FormErrorMessage from '../form-error-message';
import SelectProduct from '../select-product';
import NameInput from '../name-input';
import TimeInput from '../time-input';
import Input from '../input';

const initialState = { message: null, error: {} };

export function SelectCareForm({
  cares,
  customer,
  date,
  orderId,
  time,
}: {
  cares: Care[];
  customer: CustomerField;
  date: string;
  orderId: string;
  time: string;
}) {
  const [state, formAction] = useActionState(createAppointment, initialState);
  const [careId, setCareId] = useState('');

  let endTime = '',
    endDate = '';

  if (careId) {
    const care = cares.find((care) => care.product_id === careId);
    if (care) {
      endTime = calculateEndTime(time, care.duration);
      endDate = formatEndDate(date, endTime);
    }
  }

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <NameInput
          errors={state.errors?.name || []}
          isDisabled={true}
          label=""
          value={customer.name}
        />
        <Input
          errors={state.errors?.date || []}
          icon={
            <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          }
          id="date"
          isDisabled={true}
          label=""
          value={date}
        />
        <TimeInput
          errors={state.errors?.time || []}
          isDisabled={true}
          label=""
          value={time}
        />
        <SelectProduct
          productType="care"
          products={cares}
          errors={state.errors?.product || []}
          onProductSelect={setCareId}
        />
        <div className="mt-2 text-sm text-gray-500">
          {endTime && `Estimated end time of the appointment ${endTime}`}
        </div>
        <FormErrorMessage message={state.message} />

        <input type="hidden" name="end-date" readOnly value={endDate} />
        <input type="hidden" name="order-id" readOnly value={orderId} />
        <input type="hidden" name="date" readOnly value={date} />
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <CancelButton url="/dashboard/appointments" />
        <Button type="submit">Book Appointment</Button>
      </div>
    </form>
  );
}

// This function should format the end date of the appointment based on the
// selected care and the start date of the appointment. The duration of the care
// should be added to the start date to get the end date. The start date is
// passed as a string in the format "YYYY-MM-DD" and the duration of the care is
// stored in the care object as an integer. The end date should be returned with
// this format YYYY-MM-DD HH:MM:SS
function formatEndDate(startDate: string, endTime: string) {
  const [year, month, day] = startDate.split('-').map(Number);
  return `${year}-${month}-${day} ${endTime}:00`;
}

// This function should calculate the end time of the appointment based on the
// selected care and the start time of the appointment. The duration of the care
// should be added to the start time to get the end time. The start time is
// passed as a string in the format "HH:MM" and the duration of the care is
// stored in the care object as an integer. The end time should be returned as a
// string in the format "HH:MM".
function calculateEndTime(startTime: string, duration: number) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const endHours = hours + Math.floor(duration / 60);
  const endMinutes = minutes + (duration % 60);
  return `${endHours}:${endMinutes}`;
}
