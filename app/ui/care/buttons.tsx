import Link from 'next/link';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { deleteCare } from '@/app/lib/actions/care';

export function CreateCare() {
  return (
    <Link
      href="/dashboard/care/create"
      className="flex h-10 items-center rounded-lg bg-green-600 px-4 text-sm font-medium text-white transition-colors hover:bg-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Care</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCare({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/care/${id}/edit`}
      className="rounded-md border-0 bg-blue-400 p-2 hover:bg-blue-200"
    >
      <PencilIcon className="w-5 text-white" />
    </Link>
  );
}

export function DeleteCare({ id }: { id: string }) {
  const deleteCareWithId = deleteCare.bind(null, id);
  return (
    <form action={deleteCareWithId}>
      <button
        type="submit"
        className="rounded-md border-0 bg-red-500 p-2 hover:bg-red-100"
      >
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5 text-white" />
      </button>
    </form>
  );
}
