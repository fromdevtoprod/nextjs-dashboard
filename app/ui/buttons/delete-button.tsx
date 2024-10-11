import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DeleteButtonProps = {
  isLabelDisplayed?: boolean;
  onClick?: () => void;
};

export function DeleteButton({
  isLabelDisplayed = true,
  onClick,
}: DeleteButtonProps) {
  const t = useTranslations('Buttons');
  return (
    <Button variant="destructive" size="sm" onClick={onClick}>
      <Trash2 className={clsx('h-4 w-4', isLabelDisplayed ? 'mr-2' : '')} />
      {isLabelDisplayed && t('delete')}
    </Button>
  );
}
