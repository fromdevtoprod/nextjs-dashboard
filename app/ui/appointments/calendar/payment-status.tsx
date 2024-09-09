import clsx from 'clsx';
import { PaymentStatus } from '@/app/lib/definitions';
import { capitalize } from '@/app/lib/utils';
import { MyDollarIcon } from '../../icons/dollar';

export function PaymentDetails({ status }: { status: PaymentStatus }) {
  return (
    <div className="mt-2 flex items-center">
      <MyDollarIcon additionalClassName="mr-1" />
      <div className="flex items-center">
        <span
          className={clsx(
            'inline-block rounded-full px-2 py-1 text-xs font-semibold',
            status === 'paid' && 'bg-green-200 text-green-800',
            status === 'pending' && 'bg-yellow-200 text-yellow-800',
          )}
        >
          {capitalize(status)}
        </span>
      </div>
    </div>
  );
}
