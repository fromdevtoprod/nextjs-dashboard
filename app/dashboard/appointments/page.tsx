import Calendar from '@/app/ui/appointments/calendar';
import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Appointments</h1>
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Calendar />
      </div>
    </div>
  );
}
