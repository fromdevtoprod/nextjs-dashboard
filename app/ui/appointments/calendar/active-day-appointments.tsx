import { Appointment } from '@/app/lib/definitions';
import Preview from './preview';

export default function ActiveDayAppointments({
  appointments,
}: {
  appointments: Appointment[];
}) {
  return (
    <div className="rounded-b bg-gray-50 px-5 py-5 dark:bg-gray-700 md:px-16 md:py-8">
      <div className="px-4">
        {appointments.map((appointment, index) => (
          <Preview
            key={index}
            hour={getHour(appointment.date)}
            product={appointment.product_name}
            customer={appointment.customer_name}
            isFirst={index === 0}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * This function receives a string that represents the date of the appointment in the format 'YYYY-MM-DD HH:MM:SS' and returns the hour in the format 'HH:MM'
 * minutes are always two digits
 * @param {string} appointmentDate it is a string that represents the date of the appointment in the format 'YYYY-MM-DD HH:MM:SS'
 */
function getHour(appointmentDate: string) {
  const date = new Date(appointmentDate);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}
