'use client';

import { SelectedCustomer } from '@/src/entities/models/customer';
import { formatDateToLocal } from '@/app/lib/utils';
import NameInput from '../name-input';
import EmailInput from '../email-input';
import PhoneInput from '../phone-input';
import BirthDateInput from '../birthdate-input';
import PathologyTextarea from '../pathology-textarea';
import { ButtonLink } from '../buttons/button-link';
import { SelectedAppointment } from '@/src/entities/models/appointment';
import { BackButton } from '../buttons/back-button';
import Link from 'next/link';
import { ViewButton } from '../buttons/view-button';

export function ViewCustomerForm({
  appointments,
  customer,
}: {
  appointments: SelectedAppointment[];
  customer: SelectedCustomer;
}) {
  return (
    <>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <NameInput
          errors={[]}
          isDisabled={true}
          label=""
          value={customer.name}
        />
        <EmailInput
          errors={[]}
          isDisabled={true}
          label=""
          value={customer.email}
        />
        <PhoneInput
          errors={[]}
          isDisabled={true}
          label=""
          value={customer.phone}
        />
        <BirthDateInput
          errors={[]}
          isDisabled={true}
          label=""
          value={customer.birthDate}
        />
        <PathologyTextarea
          errors={[]}
          isDisabled={true}
          label="Pathology :"
          value={customer.pathology}
        />

        <h2 className="mt-6 text-lg font-bold">Appointments history</h2>
        <table className="mt-6 w-full">
          <thead>
            <tr>
              <th className="text-left">Date</th>
              <th className="text-left">Care</th>
              <th className="text-left">Payment status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{formatDateToLocal(appointment.date)}</td>
                <td>{appointment.care_name}</td>
                <td>{appointment.payment_status}</td>
                <td>
                  <Link href={`/dashboard/orders/${appointment.order_id}/edit`}>
                    <ViewButton label="View order" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <BackButton />
      </div>
    </>
  );
}
