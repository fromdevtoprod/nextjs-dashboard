import clsx from 'clsx';

export default function Preview({
  customer,
  endedTime,
  hour,
  isFirst = false,
  product_name,
}: {
  customer: string;
  endedTime: string;
  hour: string;
  isFirst?: boolean;
  product_name: string;
}) {
  return (
    <div
      className={clsx('border-b border-dashed border-gray-400 pb-4', {
        'pt-5': !isFirst,
      })}
    >
      <p className="text-xs font-light leading-3 text-gray-500 dark:text-gray-300">
        From {hour} to {endedTime}
      </p>
      <a
        tabIndex={0}
        className="mt-2 text-lg font-medium leading-5 text-gray-800 focus:outline-none dark:text-gray-100"
      >
        {product_name}
      </a>
      <p className="pt-2 text-sm leading-4 text-gray-600 dark:text-gray-300">
        {customer}
      </p>
    </div>
  );
}
