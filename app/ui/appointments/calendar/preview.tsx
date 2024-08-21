import clsx from 'clsx';

export default function Preview({
  hour,
  product,
  customer,
  isFirst = false,
}: {
  hour: string;
  product: string;
  customer: string;
  isFirst?: boolean;
}) {
  return (
    <div
      className={clsx('border-b border-dashed border-gray-400 pb-4', {
        'pt-5': !isFirst,
      })}
    >
      <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">
        {hour}
      </p>
      <a
        tabIndex={0}
        className="mt-2 text-lg font-medium leading-5 text-gray-800 focus:outline-none dark:text-gray-100"
      >
        {product}
      </a>
      <p className="pt-2 text-sm leading-4 text-gray-600 dark:text-gray-300">
        {customer}
      </p>
    </div>
  );
}
