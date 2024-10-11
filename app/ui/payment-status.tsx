import { useTranslations } from 'next-intl';
import { Check, Timer } from 'lucide-react';

type PaymentStatusBadgeProps = { status: string };

export function PaymentStatus({ status }: PaymentStatusBadgeProps) {
  const t = useTranslations('Payments');

  let icon;
  let label;

  if (status === 'paid') {
    icon = <Check className="mr-1 h-4 w-4" />;
    label = t('status.paid');
  } else if (status === 'pending') {
    icon = <Timer className="mr-2 h-4 w-4" />;
    label = t('status.pending');
  }

  return (
    <div className="flex items-center">
      {icon}
      <div className="flex">{label}</div>
    </div>
  );
}
