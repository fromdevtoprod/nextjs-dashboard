import Calendar from '@/app/ui/calendar';

export default function Page() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Appointments</h1>
      <p className="text-lg text-gray-500">Coming soon...</p>
      <Calendar />
    </div>
  );
}
