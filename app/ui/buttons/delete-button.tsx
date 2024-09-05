import { TrashIcon } from '@heroicons/react/24/outline';

export function DeleteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="rounded-md border-0 bg-red-500 p-2 hover:bg-red-100"
      onClick={onClick}
    >
      <span className="sr-only">Delete</span>
      <TrashIcon className="w-5 text-white" />
    </button>
  );
}
