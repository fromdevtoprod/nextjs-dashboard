import { ClockIcon, HandRaisedIcon } from '@heroicons/react/24/outline';
import { Care, CureContent } from '@/app/lib/definitions';

export default function CureDetails({
  cares,
  position,
  selected,
}: {
  cares: Care[];
  position: number;
  selected: CureContent;
}) {
  return (
    <>
      <div className="mt-6 border-l-2 border-gray-300 pl-4">
        <h3 className="mb-2 mt-2 flex items-center text-base text-gray-500">
          Care n°{position}
        </h3>
        <div className="mb-4">
          <label htmlFor="care" className="mb-2 block text-sm font-medium">
            Select a care
          </label>
          <div className="relative">
            <select
              id="care"
              name="care"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={selected.care_id}
            >
              {cares.map((care) => (
                <option key={care.id} value={care.id}>
                  {care.name}
                </option>
              ))}
            </select>
            <HandRaisedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="session_number"
            className="mb-2 block text-sm font-medium"
          >
            Enter a session number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="session_number"
                name="session_number"
                type="number"
                defaultValue={selected.session_number}
                placeholder="Enter a session number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="session_number-error"
              />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {/* <div
            id="session_number-error"
            aria-live="polite"
            aria-atomic="true"
          >
            {state.errors?.session_number &&
              state.errors.session_number.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>
      </div>
    </>
  );
}
