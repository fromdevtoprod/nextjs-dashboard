import Link from 'next/link';
import { PencilIcon } from '@heroicons/react/24/outline';

export function EditButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="rounded-md border-0 bg-blue-400 p-2 hover:bg-blue-200"
    >
      <PencilIcon className="w-5 text-white" />
    </Link>
  );
}
