'use client';

import clsx from 'clsx';
import { MyClockIcon } from '../../icons/clock';
import { MyHandRaisedIcon } from '../../icons/hand';
import { MyUserIcon } from '../../icons/user';
import { DeleteAppointmentButton } from '../delete-button';
import { EditButton } from '../../buttons/edit-button';
import { MyListBulletIcon } from '../../icons/list-bullet';

export function Preview({
  customer,
  endedTime,
  hour,
  id,
  isFirst = false,
  productName,
  productType,
  orderId,
}: {
  customer: string;
  endedTime: string;
  hour: string;
  id: string;
  isFirst?: boolean;
  productName: string;
  productType: 'care' | 'cure';
  orderId: string;
}) {
  return (
    <div
      className={clsx('flex border-b border-dashed border-gray-400 pb-4', {
        'pt-5': !isFirst,
      })}
    >
      <div className="basis-5/6">
        <p className="mb-2 flex items-center text-xs font-light leading-3 text-gray-500 dark:text-gray-300">
          <MyClockIcon additionalClassName="mr-1" />
          From {hour} to {endedTime}
        </p>
        <div className="mt-2 flex items-center">
          {productType === 'cure' && (
            <MyListBulletIcon additionalClassName="mr-1" />
          )}
          {productType === 'care' && (
            <MyHandRaisedIcon additionalClassName="mr-1" />
          )}
          <a
            tabIndex={0}
            className="text-lg font-medium leading-5 text-gray-800 focus:outline-none dark:text-gray-100"
          >
            {productName}
          </a>
        </div>
        <p className="mt-2 flex items-center text-sm leading-4 text-gray-600 dark:text-gray-300">
          <MyUserIcon additionalClassName="mr-1" />
          {customer}
        </p>
      </div>

      <div>
        <div className="flex">
          <EditButton href={`/dashboard/appointments/${id}/edit`} />
        </div>

        <div className="mt-2">
          <DeleteAppointmentButton appointmentId={id} orderId={orderId} />
        </div>
      </div>
    </div>
  );
}
