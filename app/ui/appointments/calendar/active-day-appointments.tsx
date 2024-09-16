import { PropsWithChildren } from 'react';
import { Preview } from './preview';
import { SelectedAppointment } from '@/src/entities/models/appointment';

export function ActiveDayAppointments({
  appointments,
  children,
}: PropsWithChildren<{
  appointments: SelectedAppointment[];
}>) {
  return (
    <div className="rounded-b bg-gray-50 px-5 py-5 dark:bg-gray-700">
      <div className="px-4">
        {appointments.map((appointment, index) => (
          <Preview
            customerId={appointment.customer_id}
            customerName={appointment.customer_name}
            endedTime={getHour(appointment.end_date)}
            hour={getHour(appointment.date)}
            id={appointment.id}
            isFirst={index === 0}
            key={index}
            orderId={appointment.order_id}
            careName={appointment.care_name}
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
