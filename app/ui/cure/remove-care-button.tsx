import { Button } from '../button';

export default function RemoveCareButton({
  onClick,
}: {
  onClick?: () => void;
}) {
  return (
    <Button type="button" onClick={onClick}>
      Remove Care
    </Button>
  );
}
