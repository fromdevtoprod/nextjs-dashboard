import { PlusCircleIcon } from '@heroicons/react/24/outline';

export function AddButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      onClick={onClick}
    >
      <span className="hidden md:block">{label}</span>
      <PlusCircleIcon className="h-5 md:ml-4" />
    </button>
  );
}
