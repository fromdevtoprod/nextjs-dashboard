import { TimeField } from './time-field';
import { MyClockIcon } from '../../icons/clock';

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
          <MyClockIcon additionalClassName="absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
}
