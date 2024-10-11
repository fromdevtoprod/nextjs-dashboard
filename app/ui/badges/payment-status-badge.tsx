import { useTranslations } from 'next-intl';
import { Check, Timer } from 'lucide-react';

type PaymentStatusBadgeProps = { status: string };

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const t = useTranslations('Payments');
  if (!status) return null;

  switch (status) {
    case 'paid':
      return (
        <div className="flex items-center">
          <div className="me-2 flex rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
            <Check className="mr-1 h-4 w-4" />
            {t('status.paid')}
          </div>
        </div>
      );
    case 'pending':
      return (
        <div className="flex items-center">
          <div className="me-2 flex rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            <Timer className="mr-1 h-4 w-4" />
            {t('status.pending')}
          </div>
        </div>
      );
    default:
      return null;
  }
}
