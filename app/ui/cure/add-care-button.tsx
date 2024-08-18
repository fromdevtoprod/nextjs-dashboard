import { Button } from '../button';

export default function AddCareButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button type="button" onClick={onClick}>
      Add Care
    </Button>
  );
}
