'use client';

import clsx from 'clsx';
import { PaymentStatus } from '@/app/lib/definitions';
import { MyClockIcon } from '../../icons/clock';
import { MyHandRaisedIcon } from '../../icons/hand';
import { MyUserIcon } from '../../icons/user';
import { DeleteAppointmentButton } from '../delete-button';
import { PaymentDetails } from './payment-status';
import { CustomerNameLink } from '../../customers/customer-name-link';

export function Preview({
  careName,
  customerId,
  customerName,
  endedTime,
  hour,
  id,
  isFirst = false,
  paymentStatus,
  orderId,
}: {
  careName: string;
  customerId: string;
  customerName: string;
  endedTime: string;
  hour: string;
  id: string;
  isFirst?: boolean;
  paymentStatus: string;
  orderId: string;
}) {
  return (
    <div
      className={clsx('flex border-b border-dashed border-gray-400 pb-4', {
        'pt-5': !isFirst,
      })}
    >
      <div className="basis-5/6">
        <p className="mb-2 flex items-center text-sm leading-3 text-gray-800 dark:text-gray-100">
          <MyClockIcon additionalClassName="mr-1" />
          From {hour} to {endedTime}
        </p>
        <div className="mt-2 flex items-center">
          <MyHandRaisedIcon additionalClassName="mr-1" />
          <a
            tabIndex={0}
            className="text-sm font-medium leading-5 text-gray-800 focus:outline-none dark:text-gray-100"
          >
            {careName}
          </a>
        </div>
        <p className="mt-2 flex items-center text-sm leading-4 text-gray-600 dark:text-gray-300">
          <MyUserIcon additionalClassName="mr-1" />
          <CustomerNameLink
            customerName={customerName}
            href={`/dashboard/customers/${customerId}/view`}
          />
        </p>
        <PaymentDetails status={paymentStatus} />
      </div>

      <div>
        <div className="mt-2">
          <DeleteAppointmentButton appointmentId={id} orderId={orderId} />
        </div>
      </div>
    </div>
  );
}
