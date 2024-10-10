import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type SelectPaymentStatusProps = {
  defaultValue?: string;
};

export function SelectPaymentStatus({
  defaultValue,
}: SelectPaymentStatusProps) {
  const t = useTranslations('Payments');
  return (
    <>
      <Label htmlFor="payment" className="text-right">
        {t('status.label')}
      </Label>
      <Select name="payment" defaultValue={defaultValue} required>
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder={t('status.placeholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paid">{t('status.paid')}</SelectItem>
          <SelectItem value="pending">{t('status.pending')}</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
