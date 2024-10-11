import { useTranslations } from 'next-intl';
import { Banknote, CreditCard, DollarSign, House } from 'lucide-react';

type PaymentMethodProps = { method: string };

export function PaymentMethod({ method }: PaymentMethodProps) {
  const t = useTranslations('Payments');

  let icon;
  let label;

  if (method === 'card') {
    icon = <CreditCard className="mr-2 h-4 w-4" />;
    label = t('method.card');
  } else if (method === 'cash') {
    icon = <Banknote className="mr-2 h-4 w-4" />;
    label = t('method.cash');
  } else if (method === 'check') {
    icon = <House className="mr-2 h-4 w-4" />;
    label = t('method.check');
  } else if (method === 'transfer') {
    icon = <DollarSign className="mr-2 h-4 w-4" />;
    label = t('method.transfer');
  }

  return (
    <div className="flex items-center">
      {icon}
      <div className="flex">{label}</div>
    </div>
  );
}
