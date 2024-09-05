'use client';

import clsx from 'clsx';
import { deleteAppointment } from '@/app/lib/actions/appointments';
import { MyClockIcon } from '../../icons/clock';
import { MyHandRaisedIcon } from '../../icons/hand';
import { MyUserIcon } from '../../icons/user';
import { DeleteAppointmentButton } from '../delete-button';

export function Preview({
  customer,
  endedTime,
  hour,
  id,
  isFirst = false,
  product_name,
}: {
  customer: string;
  endedTime: string;
  hour: string;
  id: string;
  isFirst?: boolean;
  product_name: string;
}) {
  const deleteAppointmentWithId = deleteAppointment.bind(null, id);
  return (
    <div
      className={clsx('border-b border-dashed border-gray-400 pb-4', {
        'pt-5': !isFirst,
      })}
    >
      <p className="mb-1 flex items-center text-xs font-light leading-3 text-gray-500 dark:text-gray-300">
        <MyClockIcon additionalClassName="mr-1" />
        From {hour} to {endedTime}
      </p>
      <div className="mt-1 flex items-center">
        <MyHandRaisedIcon additionalClassName="mr-1" />
        <a
          tabIndex={0}
          className="text-lg font-medium leading-5 text-gray-800 focus:outline-none dark:text-gray-100"
        >
          {product_name}
        </a>
      </div>

      <p className="mt-1 flex items-center text-sm leading-4 text-gray-600 dark:text-gray-300">
        <MyUserIcon additionalClassName="mr-1" />
        {customer}
      </p>
      <div className="mb-3 mt-2">
        <DeleteAppointmentButton id={id} />
      </div>
    </div>
  );
}
