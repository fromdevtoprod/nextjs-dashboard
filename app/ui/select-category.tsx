import { TagIcon } from '@heroicons/react/24/outline';
import { CareCategory } from '../lib/definitions';

export default function SelectCategory({
  categories = [],
  value,
}: {
  categories?: CareCategory[];
  value?: string;
}) {
  return (
    <div className="mb-4">
      <label htmlFor="category" className="mb-2 block text-sm font-medium">
        Select a category
      </label>
      <div className="relative">
        <select
          id="category"
          name="category"
          className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          defaultValue={value}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
      </div>
    </div>
  );
}
