import { Care } from '@/app/lib/definitions';
import { MyClockIcon } from '../icons/clock';
import { MyHandRaisedIcon } from '../icons/hand';

export default function CureDetails({
  cares,
  position,
  selectedCare = '',
  sessionNumber = 0,
  errors,
}: {
  cares: Care[];
  position: number;
  selectedCare?: string;
  sessionNumber?: number;
  errors: { care: any; session_number: any };
}) {
  return (
    <>
      <div className="mt-6 border-l-2 border-gray-300 pl-4">
        <h3 className="mb-2 mt-2 flex items-center text-base text-gray-500">
          Care n°{position}
        </h3>
        <div className="mb-4">
          <label
            htmlFor={`care_${position}`}
            className="mb-2 block text-sm font-medium"
          >
            Select a care
          </label>
          <div className="relative">
            <select
              id={`care_${position}`}
              name={`care_${position}`}
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={selectedCare}
            >
              {cares.map((care) => (
                <option key={care.product_id} value={care.product_id}>
                  {care.product_name}
                </option>
              ))}
            </select>
            <MyHandRaisedIcon additionalClassName="absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <div id="care-error" aria-live="polite" aria-atomic="true">
            {errors &&
              errors.care.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor={`session_number_${position}`}
            className="mb-2 block text-sm font-medium"
          >
            Enter a session number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id={`session_number_${position}`}
                name={`session_number_${position}`}
                type="number"
                defaultValue={sessionNumber}
                placeholder="Enter a session number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="session_number-error"
              />
              <MyClockIcon additionalClassName="absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div id="session_number-error" aria-live="polite" aria-atomic="true">
            {errors &&
              errors.session_number.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
