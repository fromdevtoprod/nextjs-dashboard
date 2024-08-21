import { Appointment } from '@/app/lib/definitions';
import Preview from './preview';
import { PropsWithChildren } from 'react';

export default function ActiveDayAppointments({
  appointments,
  children,
}: PropsWithChildren<{
  appointments: Appointment[];
}>) {
  return (
    <div className="rounded-b bg-gray-50 px-5 py-5 dark:bg-gray-700 md:px-16 md:py-8">
      <div className="px-4">
        {appointments.map((appointment, index) => (
          <Preview
            key={index}
            hour={getHour(appointment.date)}
            product_name={appointment.product_name}
            endedTime={getHour(appointment.ended_time)}
            customer={appointment.customer_name}
            isFirst={index === 0}
          />
        ))}
      </div>
      <div className="mt-4">{children}</div>
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
