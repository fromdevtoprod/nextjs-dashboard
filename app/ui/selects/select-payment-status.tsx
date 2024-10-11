import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PaymentStatus } from '../payment-status';

type SelectPaymentStatusProps = {
  defaultValue?: string;
};

export function SelectPaymentStatus({
  defaultValue,
}: SelectPaymentStatusProps) {
  const t = useTranslations('Payments');
  return (
    <>
      <Label htmlFor="status" className="text-right">
        {t('status.label')}
      </Label>
      <Select name="status" defaultValue={defaultValue} required>
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder={t('status.placeholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paid">
            <PaymentStatus status="paid" />
          </SelectItem>
          <SelectItem value="pending">
            <PaymentStatus status="pending" />
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
