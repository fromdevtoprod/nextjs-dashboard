import Link from 'next/link';

export function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-[#7C9885] px-4 py-6 sm:flex-row md:px-6">
      <p className="text-sm text-white">
        © 2024 ZenAgenda. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link
          className="text-sm text-white underline-offset-4 hover:underline"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="text-sm text-white underline-offset-4 hover:underline"
          href="#"
        >
          Privacy Policy
        </Link>
        <Link
          className="text-sm text-white underline-offset-4 hover:underline"
          href="#"
        >
          HIPAA Compliance
        </Link>
      </nav>
    </footer>
  );
}
