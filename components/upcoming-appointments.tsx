import { fetchAppointmentsByDate } from '@/app/lib/data/appointments';
import { formatDateToLocal } from '@/app/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// // Mock appointment data
// const appointments = [
//   {
//     id: 1,
//     client: 'Alice Johnson',
//     date: '2024-03-15',
//     time: '10:00 AM',
//     type: 'Therapy Session',
//   },
//   {
//     id: 2,
//     client: 'Bob Smith',
//     date: '2024-03-15',
//     time: '2:00 PM',
//     type: 'Initial Consultation',
//   },
//   {
//     id: 3,
//     client: 'Carol Williams',
//     date: '2024-03-16',
//     time: '11:30 AM',
//     type: 'Follow-up',
//   },
//   {
//     id: 4,
//     client: 'David Brown',
//     date: '2024-03-17',
//     time: '3:00 PM',
//     type: 'Therapy Session',
//   },
//   {
//     id: 5,
//     client: 'Eva Davis',
//     date: '2024-03-18',
//     time: '9:00 AM',
//     type: 'Wellness Check',
//   },
// ];

export async function UpcomingAppointments({
  activeDay,
  activeMonth,
  activeYear,
}: {
  activeDay: number;
  activeMonth: number;
  activeYear: number;
}) {
  const appointments = await fetchAppointmentsByDate(
    activeDay,
    activeMonth,
    activeYear,
  );
  console.log(
    `appointments for ${activeYear}-${activeMonth}-${activeDay}`,
    appointments,
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between rounded-lg bg-white p-4 shadow"
            >
              <div>
                <h3 className="font-semibold text-[#2C3E50]">
                  {appointment.customer_name}
                </h3>
                <p className="text-sm text-[#7C9885]">
                  {appointment.care_name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[#2C3E50]">
                  {formatDateToLocal(appointment.date)}
                </p>
                <p className="text-sm text-[#7C9885]">
                  10:00 PM
                  {/* {formatDateToLocal(appointment.date)} */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
