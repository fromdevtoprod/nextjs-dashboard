import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
          <SelectItem value="cash">{t('method.cash')}</SelectItem>
          <SelectItem value="check">{t('method.check')}</SelectItem>
          <SelectItem value="transfer">{t('method.transfer')}</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}
