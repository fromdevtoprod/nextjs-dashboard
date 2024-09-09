'use client';

import { AppointmentShortDescription, Customer } from '@/app/lib/definitions';
import NameInput from '../name-input';
import EmailInput from '../email-input';
import PhoneInput from '../phone-input';
import BirthDateInput from '../birthdate-input';
import PathologyTextarea from '../pathology-textarea';
import { ButtonLink } from '../buttons/button-link';
import { Button } from '../button';
import { useRouter } from 'next/navigation';
import { capitalize, formatDateToLocal } from '@/app/lib/utils';

export function ViewCustomerForm({
  appointments,
  customer,
}: {
  appointments: AppointmentShortDescription[];
  customer: Customer;
}) {
  const router = useRouter();
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
          value={customer.birth_date}
        />
        <PathologyTextarea
          errors={[]}
          isDisabled={true}
          label="Pathology :"
          value={customer.pathology}
        />

        {/* display customer last appointments with the help of a table using the full width available */}
        <h2 className="mt-6 text-lg font-bold">Last appointments</h2>
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
                <td>
                  {appointment.product_name} ({appointment.product_type})
                </td>
                <td>{appointment.payment_status}</td>
                <td>
                  <ButtonLink
                    href={`/dashboard/orders/${appointment.order_id}/edit`}
                  >
                    View order
                  </ButtonLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Button onClick={() => router.back()}>Back</Button>
        <ButtonLink href={`/dashboard/customers/${customer.id}/edit`}>
          Edit customer
        </ButtonLink>
      </div>
    </>
  );
}
