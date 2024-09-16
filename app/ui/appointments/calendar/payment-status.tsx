import clsx from 'clsx';
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import { MyDollarIcon } from '../../icons/dollar';

export function PaymentDetails({ status }: { status: string }) {
  return (
    <div className="mt-2 flex items-center">
      <MyDollarIcon additionalClassName="mr-1" />
      <div className="flex items-center">
        <span
          className={clsx(
            'inline-flex items-center rounded-full px-2 py-1 text-xs',
            {
              'bg-yellow-200 text-yellow-800': status === 'pending',
              'bg-green-500 text-white': status === 'paid',
            },
          )}
        >
          {status === 'pending' ? (
            <>
              Pending
              <ClockIcon className="ml-1 w-4 text-yellow-800" />
            </>
          ) : null}
          {status === 'paid' ? (
            <>
              Paid
              <CheckIcon className="ml-1 w-4 text-white" />
            </>
          ) : null}
        </span>
      </div>
    </div>
  );
}
