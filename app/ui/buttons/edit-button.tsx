import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

type EditButtonProps = {
  onClick?: () => void;
};

export function EditButton({ onClick }: EditButtonProps) {
  return (
    <Button variant="outline" size="sm" onClick={onClick}>
      <Edit className="mr-2 h-4 w-4" />
      Edit
    </Button>
  );
}
