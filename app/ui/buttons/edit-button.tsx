import clsx from 'clsx';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

type EditButtonProps = {
  isLabelDisplayed?: boolean;
  onClick?: () => void;
};

export function EditButton({
  isLabelDisplayed = true,
  onClick,
}: EditButtonProps) {
  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      <Edit className={clsx('h-4 w-4', isLabelDisplayed ? 'mr-2' : '')} />
      {isLabelDisplayed && 'Edit'}
    </Button>
  );
}
