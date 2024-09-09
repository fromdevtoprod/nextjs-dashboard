import { PropsWithChildren } from 'react';
import { Appointment } from '@/app/lib/definitions';
import { Preview } from './preview';

export function ActiveDayAppointments({
  appointments,
  children,
}: PropsWithChildren<{
  appointments: Appointment[];
}>) {
  return (
    <div className="rounded-b bg-gray-50 px-5 py-5 dark:bg-gray-700">
      <div className="px-4">
        {appointments.map((appointment, index) => (
          <Preview
            customer={appointment.customer_name}
            endedTime={getHour(appointment.end_date)}
            hour={getHour(appointment.date)}
            id={appointment.id}
            isFirst={index === 0}
            key={index}
            orderId={appointment.order_id}
            productName={appointment.product_name}
            paymentStatus={appointment.payment_status}
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
