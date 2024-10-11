import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PaymentMethod } from '../payment-method';

type SelectPaymentMethodProps = {
  defaultValue?: string;
};

export function SelectPaymentMethod({
  defaultValue,
}: SelectPaymentMethodProps) {
  const t = useTranslations('Payments');
  return (
    <>
      <Label htmlFor="method" className="text-right">
        {t('method.label')}
      </Label>
      <Select name="method" required defaultValue={defaultValue}>
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder={t('method.placeholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cash">
            <PaymentMethod method="cash" />
          </SelectItem>
          <SelectItem value="check">
            <PaymentMethod method="check" />
          </SelectItem>
          <SelectItem value="transfer">
            <PaymentMethod method="transfer" />
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
