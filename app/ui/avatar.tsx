export function Avatar({ name }: { name: string }) {
  const initial = name.charAt(0);
  return (
    <div className="relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {initial}
      </span>
    </div>
  );
}
