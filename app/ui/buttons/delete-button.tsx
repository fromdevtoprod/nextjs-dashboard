import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DeleteButtonProps = {
  onClick?: () => void;
};

export function DeleteButton({ onClick }: DeleteButtonProps) {
  return (
    <Button variant="destructive" size="sm" onClick={onClick}>
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </Button>
  );
}
