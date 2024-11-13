import { CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AppointmentTypesWithRemainingSessions } from '@/src/application/use-cases/appointment-types/find-appointment-types-with-remaining-sessions.use-case';

type AddAppointmentButtonProps = {
  appointmentTypes: AppointmentTypesWithRemainingSessions[];
  label: string;
};

export function AddAppointmentButton({
  appointmentTypes,
  label,
}: AddAppointmentButtonProps) {
  const isDisabled =
    appointmentTypes.length === 0 ||
    appointmentTypes.every(
      ({ appointmentTypes: appTypes }) => appTypes.length === 0,
    );
  return (
    <Button
      className="bg-[#7C9885] text-white hover:bg-[#6A8A73]"
      disabled={isDisabled}
    >
      <CalendarPlus className="mr-2 h-5 w-5" />
      {label}
    </Button>
  );
}
