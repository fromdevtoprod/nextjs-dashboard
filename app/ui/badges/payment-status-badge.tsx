import { capitalize } from '@/app/lib/utils';

type PaymentStatusBadgeProps = { status: string };

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  if (!status) return null;

  const capitalizedStatus = capitalize(status);
  switch (capitalizedStatus) {
    case 'Paid':
      return (
        <span className="me-2 rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
          {capitalizedStatus}
        </span>
      );
    case 'Pending':
      return (
        <span className="me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          {capitalizedStatus}
        </span>
      );
    default:
      return null;
  }
}
