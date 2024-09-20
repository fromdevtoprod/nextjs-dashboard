import Link from 'next/link';
import { EyeIcon } from '@heroicons/react/24/outline';

export function ViewButton({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="rounded-md border-0 bg-blue-400 p-2 hover:bg-blue-200"
    >
      <EyeIcon className="w-5 text-white" />
    </Link>
  );
}
