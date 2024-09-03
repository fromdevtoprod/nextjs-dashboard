import { ClockIcon } from '@heroicons/react/24/outline';
import { TimeField } from './time-field';

export default function TimeInput({
  onSetTime,
}: {
  onSetTime: (time: string) => void;
}) {
  return (
    <div className="mt-2">
      <p className="text-sm text-gray-500">Start time of the appointment :</p>
      <div className="relative mt-2 rounded-md">
        <div className="relative">
          <TimeField onChange={onSetTime} />
          <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>
    </div>
  );
}
