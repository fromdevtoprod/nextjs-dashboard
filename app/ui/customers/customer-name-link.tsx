export function CustomerNameLink({
  customerName,
  href,
}: {
  customerName: string;
  href: string;
}) {
  return (
    <a
      href={href}
      tabIndex={0}
      className="text-lg font-medium leading-5 text-gray-800 focus:outline-none dark:text-gray-100"
    >
      {customerName}
    </a>
  );
}
